import fetcher from "@/lib/fetcher";
import { User } from "@prisma/client";

import useSWR from "swr";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./zustand/useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: followingUser, mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success(`You are following ${followingUser?.name}`);
    } catch (err) {
      toast.error("Error Following");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    followingUser,
    mutateFetchedUser,
    loginModal,
  ]);

  return { isFollowing, toggleFollow };
};

export default useFollow;
