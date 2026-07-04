"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useUser } from "@clerk/nextjs"; // Import Clerk's user hook

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export const useViewerToken = (hostIdentity: string) => {
  const { user, isLoaded } = useUser(); // Get Clerk auth state
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    // Wait until Clerk is fully loaded before trying to build a token
    if (!isLoaded) return;

    const createToken = async () => {
      try {
        let viewerIdentity = "";
        let viewerName = "";

        // 1. If a Clerk user is logged in, use their real profile details
        if (user) {
          viewerIdentity = user.id;
          viewerName = user.username || user.firstName || "User";
        } else {
          // 2. Fallback to Guest structure if no user is signed in
          let cachedIdentity = sessionStorage.getItem("cpstream-viewer-identity");
          let cachedName = sessionStorage.getItem("cpstream-viewer-name");

          if (!cachedIdentity) {
            cachedIdentity = `guest_${crypto.randomUUID()}`;
            sessionStorage.setItem("cpstream-viewer-identity", cachedIdentity);
          }

          if (!cachedName) {
            const shortId = cachedIdentity.slice(-4);
            cachedName = `Guest_${shortId}`;
            sessionStorage.setItem("cpstream-viewer-name", cachedName);
          }

          viewerIdentity = cachedIdentity;
          viewerName = cachedName;
        }

        // 3. Request the token from your backend
        const res = await fetch(`${BACKEND_URL}/api/livekit/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName: hostIdentity,
            identity: viewerIdentity,
            name: viewerName,
            canPublish: false,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to create token");
        }

        const data = await res.json();
        setToken(data.token);

        const decodedToken = jwtDecode(data.token) as JwtPayload & {
          name?: string;
        };

        const decodedName = decodedToken?.name;
        const decodedIdentity = decodedToken.jti || viewerIdentity;

        setIdentity(decodedIdentity);
        setName(decodedName || viewerName);
      } catch (error) {
        console.log("TOKEN ERROR:", error);
        toast.error("Something went wrong! Error creating token");
      }
    };

    createToken();
  }, [hostIdentity, user, isLoaded]); // Re-run if host changes or authentication state switches

  return {
    token,
    name,
    identity,
  };
};