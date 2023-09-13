import React from "react";
import CommentItem from "./CommentItem";

export type CommentFeedProps = {
  comments?: Record<string, any>[];
};

const CommentFeed: React.FunctionComponent<CommentFeedProps> = ({
  comments,
}) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
