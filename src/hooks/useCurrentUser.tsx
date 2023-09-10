import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useCurrentUser = () => {
  const { data, isLoading, error } = useSWR("/api/current", fetcher, {});

  return {
    data,
    isLoading,
    error,
  };
};

export default useCurrentUser;
