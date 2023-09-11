import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import type { PostWithUserAndCommentWithUser } from "@/types";

const usePost = (postId: string) => {
  const url = postId ? `/api/posts/${postId}` : null;

  const { data, isLoading, error, mutate } = useSWR(url, fetcher);
  return { data, isLoading, error, mutate };
};

export default usePost;
