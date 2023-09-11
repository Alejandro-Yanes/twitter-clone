import fetcher from "@/lib/fetcher";
import { User } from "@prisma/client";
import useSWR from "swr";

const useUsers = () => {
  const { data, isLoading, error } = useSWR<User[]>("/api/users", fetcher);

  return {
    data,
    isLoading,
    error,
  };
};

export default useUsers;
