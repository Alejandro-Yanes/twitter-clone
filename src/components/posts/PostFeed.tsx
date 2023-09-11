import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";

export type PostFeedProps = {
  userId?: string;
};

const PostFeed: React.FunctionComponent<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
