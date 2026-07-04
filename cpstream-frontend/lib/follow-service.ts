import { getSelf } from "@/lib/auth-service";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export const getFollwedUser = async () => {
  try {
    const self = await getSelf();

    const [usersRes, streamsRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/follows?viewerId=${self.id}`, {
        cache: "no-store",
      }),
      fetch(`${BACKEND_URL}/api/streams`, {
        cache: "no-store",
      }),
    ]);

    if (!usersRes.ok) {
      return [];
    }

    const users = await usersRes.json();

    let streams: any[] = [];

    if (streamsRes.ok) {
      streams = await streamsRes.json();
    }

    const streamByUsername = new Map(
      streams.map((stream: any) => [stream.username, stream])
    );

    return users.map((user: any) => {
      const stream = streamByUsername.get(user.username);

      return {
        id: user.id,
        username: user.username,
        imageUrl: user.imageUrl || "",
        stream: {
          isLive: stream?.isLive || false,
        },
      };
    });
  } catch {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (id === self.id) return true;

    const res = await fetch(
      `${BACKEND_URL}/api/follows/${id}/status?viewerId=${self.id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return false;

    return await res.json();
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  console.log("FOLLOW URL:", `${BACKEND_URL}/api/follows/${id}?viewerId=${self.id}`);
  console.log("SELF:", self);

  if (id === self.id) {
    throw new Error("You can't follow yourself");
  }

  const res = await fetch(
    `${BACKEND_URL}/api/follows/${id}?viewerId=${self.id}`,
    {
      method: "POST",
      cache: "no-store",
    }
  );

  const text = await res.text();
  console.log("FOLLOW RESPONSE:", res.status, text);

  if (!res.ok) {
    throw new Error("Failed to follow user: " + text);
  }

  return { success: true };
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  console.log("UNFOLLOW URL:", `${BACKEND_URL}/api/follows/${id}?viewerId=${self.id}`);
  console.log("SELF:", self);

  if (id === self.id) {
    throw new Error("You can't unfollow yourself");
  }

  const res = await fetch(
    `${BACKEND_URL}/api/follows/${id}?viewerId=${self.id}`,
    {
      method: "DELETE",
      cache: "no-store",
    }
  );

  const text = await res.text();
  console.log("UNFOLLOW RESPONSE:", res.status, text);

  if (!res.ok) {
    throw new Error("Failed to unfollow user: " + text);
  }

  return { success: true };
};