import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import React, { useCallback, useMemo } from "react";

import Avatar from "../Avatar";
import Button from "../Button";
import { PostWithUserAndComments } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import useCurrentUser from "@/hooks/useCurrentUser";
import useDeletePostModal from "@/hooks/zustand/useDeletePostModal";
import useLink from "@/hooks/useLike";
import useLoginModal from "@/hooks/zustand/useLoginModal";
import { useRouter } from "next/router";

export type PostItemProps = {
  data: PostWithUserAndComments | any;
  userId?: string;
};

const PostItem: React.FunctionComponent<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const deleteModal = useDeletePostModal();
  const { hasLiked, toggleLike } = useLink({ postId: data.id, userId });

  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const handleDelete = useCallback(
    (postId: string) => {
      deleteModal.onInsertPostId(postId);
      deleteModal.onOpen();
    },
    [deleteModal]
  );

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div className="flex flex-col flex-grow">
          <div className="flex flex-row items-center gap-2">
            <p
              className="text-white font-semibol cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {data.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm flex-grow">
              {createdAt}
            </span>
            {currentUser?.id === data.user.id && (
              <div>
                <Button
                  label="delete"
                  danger
                  onClick={() => handleDelete(data.id)}
                />
              </div>
            )}
          </div>
          <p className="text-white mt-1">{data.body}</p>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500"
            >
              <LikeIcon size={20} color={hasLiked ? "red" : ""} />
              <p>{data.likedIds.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
