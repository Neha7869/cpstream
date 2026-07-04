import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;

  // Sync user creations or updates directly to your Spring Boot REST application
  if (eventType === "user.created" || eventType === "user.updated") {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          externalUserId: payload.data.id,
          username: payload.data.username,
          imageUrl: payload.data.image_url,
          bio: "",
        }),
      });

      if (!response.ok) {
        console.error("Spring Boot database sync failed:", await response.text());
        return new Response("Backend sync failure", { status: 500 });
      }
    } catch (error) {
      console.error("Failed connecting to Spring Boot backend server:", error);
      return new Response("Internal Server Error reaching sync backend", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/sync/${payload.data.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.error("Backend delete sync failed:", await response.text());
      }
    } catch (error) {
      console.error("Failed sending delete message to Spring Boot backend:", error);
    }
  }

  return new Response("", { status: 200 });
}