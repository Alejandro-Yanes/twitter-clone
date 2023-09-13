import React, { useCallback, useMemo, useState } from "react";

import { BiCalendar } from "react-icons/bi";
import Button from "../Button";
import { format } from "date-fns";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/zustand/useEditModal";
import useFollow from "@/hooks/useFollow";
import useUser from "@/hooks/useUser";

export type UserBioProps = {
  userId: string;
};

const UserBio: React.FunctionComponent<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const editModal = useEditModal();
  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "dd MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const overChange = useCallback(() => {
    if (!isFollowing) return "Follow";

    if (mouseOver) return "Unfollow";

    return "Following";
  }, [mouseOver, isFollowing]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-4">
      <div className="flex justify-end">
        {currentUser?.id === userId ? (
          <Button
            secondary
            label="Edit"
            onClick={() => editModal.onOpen()}
            medium
          />
        ) : (
          <div
            onMouseOver={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
          >
            <Button
              label={overChange()}
              onClick={() => toggleFollow()}
              outline={isFollowing}
              terciary={!isFollowing}
              primary={isFollowing}
              medium
            />
          </div>
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-neutral-500 text-md">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchedUser?.bio}</p>
        </div>
        <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
          <BiCalendar size={24} />
          <p>Joined {createdAt}</p>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followedCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
