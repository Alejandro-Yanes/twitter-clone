import React, { useCallback, useReducer, useState } from "react";

import ConfirmModalLayout from "./Layouts/ConfirmModalLayout";
import axios from "axios";
import { toast } from "react-hot-toast";
import useDeletePostModal from "@/hooks/zustand/useDeletePostModal";
import usePosts from "@/hooks/usePosts";
import { useRouter } from "next/router";

export type DeletePostProps = {};

const DeletePost: React.FunctionComponent<DeletePostProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deletePostModal = useDeletePostModal();
  const { mutate: mutatePosts } = usePosts();
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    if (!deletePostModal.postId) {
      return;
    }

    console.log(deletePostModal.postId);

    try {
      await axios.delete(`/api/posts`, {
        data: { postId: deletePostModal.postId },
      });

      router.back();
      deletePostModal.onClose();
      mutatePosts();
      toast.success("Post deleted");
    } catch (err) {
      toast.error("Error deleting post");
    } finally {
      setIsLoading(false);
    }
  }, [deletePostModal, setIsLoading, toast]);

  return (
    <ConfirmModalLayout
      onClose={deletePostModal.onClose}
      onSubmit={onSubmit}
      actionLabel="Delete"
      title="Delete Post?"
      description="This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results."
      isOpen={deletePostModal.isOpen}
      disabled={isLoading}
    />
  );
};

export default DeletePost;
