"use server";

import { revalidatePath } from "next/cache";

import { blockUser, unblockUser } from "@/lib/block-service";

export const onBlock = async (id: string, username?: string) => {
  try {
    console.log("BLOCK CALLED WITH ID:", id, "username:", username);
    const blockedUser = await blockUser(id);

    revalidatePath("/");
    revalidatePath("/search");

    if (username) {
      revalidatePath(`/${username}`);
    }

    return blockedUser;
  } catch (error: any) {
    console.error("BLOCK ERROR FULL:", error?.message, error);
    throw new Error("Internal server error");
  }
};

export const onUnblock = async (id: string, username?: string) => {
  try {
    console.log("UNBLOCK CALLED WITH ID:", id, "username:", username);
    const unblockedUser = await unblockUser(id);

    revalidatePath("/");
    revalidatePath("/search");

    if (username) {
      revalidatePath(`/${username}`);
    }

    return unblockedUser;
  } catch (error: any) {
    console.error("UNBLOCK ERROR FULL:", error?.message, error);
    throw new Error("Internal server error");
  }
};