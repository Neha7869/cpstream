"use client";

import React, { useTransition } from "react";
import { Heart, Ban } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { onFollow, onUnfollow } from "@/actions/follow";
import { onBlock, onUnblock } from "@/actions/block";

export function Actions({
  hostIdentity,
  hostName,
  isFollowing,
  isBlocked,
  isHost,
}: {
  hostIdentity: string;
  hostName: string;
  isFollowing: boolean;
  isBlocked: boolean;
  isHost: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity, hostName)
        .then(() => toast.success("Followed successfully"))
        .catch(() => toast.error("Something went wrong while following."));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity, hostName)
        .then(() => toast.success("Unfollowed successfully"))
        .catch(() => toast.error("Something went wrong while unfollowing."));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(hostIdentity, hostName)
        .then(() => toast.success("Blocked successfully"))
        .catch(() => toast.error("Something went wrong while blocking."));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(hostIdentity, hostName)
        .then(() => toast.success("Unblocked successfully"))
        .catch(() => toast.error("Something went wrong while unblocking."));
    });
  };

  const toggleFollow = () => {
    if (isHost) return;
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const toggleBlock = () => {
    if (isHost) return;
    if (isBlocked) {
      handleUnblock();
    } else {
      handleBlock();
    }
  };

  if (isHost) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={isPending}
        onClick={toggleFollow}
        variant="primary"
        size="sm"
        className="w-full lg:w-auto"
      >
        <Heart
          className={cn(
            "h-4 w-4 mr-2",
            isFollowing ? "fill-white" : "fill-none"
          )}
        />
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>

      <Button
        disabled={isPending}
        onClick={toggleBlock}
        variant="outline"
        size="sm"
        className="w-full lg:w-auto"
      >
        <Ban className="h-4 w-4 mr-2" />
        {isBlocked ? "Unblock" : "Block"}
      </Button>
    </div>
  );
}

export function ActionsSkeleton() {
  return <Skeleton className="h-10 w-full lg:w-24" />;
}