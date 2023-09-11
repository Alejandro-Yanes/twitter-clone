import fetcher from "@/lib/fetcher";
import { User } from "@prisma/client";
import useSWR from "swr";

type TypeUserWithFollowersCount<T> = Partial<T> & {
  followedCount: number;
};

const useUser = (userId: string) => {
  const { data, isLoading, error, mutate } = useSWR<
    TypeUserWithFollowersCount<User>
  >(userId ? `/api/users/${userId}` : null, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useUser;
