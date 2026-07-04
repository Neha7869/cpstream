"use server";

import { revalidatePath } from "next/cache";

import { followUser, unfollowUser } from "@/lib/follow-service";

export const onFollow = async (id: string, username?: string) => {
  try {
    console.log("FOLLOW CALLED WITH ID:", id, "username:", username);
    const followedUser = await followUser(id);

    revalidatePath("/");
    revalidatePath("/search");

    if (username) {
      revalidatePath(`/${username}`);
    }

    return followedUser;
  } catch (error: any) {
    console.error("FOLLOW ERROR FULL:", error?.message, error);
    throw new Error("Internal server error");
  }
};

export const onUnfollow = async (id: string, username?: string) => {
  try {
    console.log("UNFOLLOW CALLED WITH ID:", id, "username:", username);
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");
    revalidatePath("/search");

    if (username) {
      revalidatePath(`/${username}`);
    }

    return unfollowedUser;
  } catch (error: any) {
    console.error("UNFOLLOW ERROR FULL:", error?.message, error);
    throw new Error("Internal server error");
  }
};