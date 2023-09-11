import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import type { PostWithUserAndComments } from "@/types";

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  const { data, isLoading, error, mutate } = useSWR<PostWithUserAndComments[]>(
    url,
    fetcher
  );
  return { data, isLoading, error, mutate };
};

export default usePosts;
