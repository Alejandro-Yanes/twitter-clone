import fetcher from "@/lib/fetcher";
import { User } from "@prisma/client";
import useSWR from "swr";

const useCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSWR<User>(
    "/api/current",
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useCurrentUser;
