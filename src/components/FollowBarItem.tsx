import React, { useCallback, useMemo, useState } from "react";

import Avatar from "./Avatar";
import Button from "./Button";
import { User } from "@prisma/client";
import useFollow from "@/hooks/useFollow";
import { useRouter } from "next/router";
import useUnfollowModal from "@/hooks/zustand/useUnfollowModal";

export type FollowBarItemProps = {
  user: User;
};

const FollowBarItem: React.FunctionComponent<FollowBarItemProps> = ({
  user,
}) => {
  const router = useRouter();
  const { isFollowing, toggleFollow } = useFollow(user.id);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const unfollowModal = useUnfollowModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const overChange = useCallback(() => {
    if (!isFollowing) return "Follow";

    if (mouseOver) return "Unfollow";

    return "Following";
  }, [mouseOver, isFollowing]);

  const handleFollow = useCallback(
    async (userId: string) => {
      if (!isFollowing) {
        try {
          setIsLoading(true);
          await toggleFollow();
        } catch (err) {
        } finally {
          setIsLoading(false);
        }
      } else {
        unfollowModal.onInsertUserId(userId);
        unfollowModal.onOpen();
      }
    },
    [toggleFollow, setIsLoading, isLoading]
  );

  return (
    <div
      className="flex items-center gap-4 py-3 px-4 hover:bg-neutral-700 transition-colors cursor-pointer "
      key={user.id}
      onClick={() => router.push(`/${user.id}`)}
    >
      <Avatar userId={user.id} key={user.id} />
      <div className="flex flex-col flex-grow">
        <p className="text-white font-bold text-sm capitalize hover:underline transition">
          {user.name}
        </p>
        <p className="text-neutral-400 text-sm ">@{user.username}</p>
      </div>
      <div
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <Button
          label={overChange()}
          onClick={() => handleFollow(user.id)}
          small
          terciary={!isFollowing}
          primary={isFollowing}
          dangerOutlined={isFollowing && mouseOver}
          outline={isFollowing}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default FollowBarItem;
