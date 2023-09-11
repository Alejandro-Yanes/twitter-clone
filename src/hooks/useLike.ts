import fetcher from "@/lib/fetcher";
import { Post } from "@prisma/client";

import useSWR from "swr";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import { useCallback, useMemo } from "react";
import usePosts from "./usePosts";
import useLoginModal from "./zustand/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

type useLinkProps = {
  postId: string;
  userId?: string;
};

const useLink = ({ postId, userId }: useLinkProps) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete(`/api/like`, { data: { postId } });
      } else {
        request = () => axios.post(`/api/like`, { postId });
      }

      await request();

      mutateFetchedPosts();
      mutateFetchedPost();

      toast.success("Success");
    } catch (err) {
      toast.error("Liking went wrong");
    }
  }, [
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal,
    toast,
    hasLiked,
    currentUser,
  ]);

  return { hasLiked, toggleLike };
};

export default useLink;
