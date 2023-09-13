import React, { useCallback } from "react";

import ConfirmModalLayout from "./Layouts/ConfirmModalLayout";
import useFollow from "@/hooks/useFollow";
import useUnfollowModal from "@/hooks/zustand/useUnfollowModal";
import useUser from "@/hooks/useUser";

export type UnfollowModalProps = {};

const UnfollowModal: React.FunctionComponent<UnfollowModalProps> = (props) => {
  const unfollowModal = useUnfollowModal();
  const { isFollowing, toggleFollow } = useFollow(unfollowModal.userId);
  const { data } = useUser(unfollowModal.userId);

  const handleSubmit = useCallback(async () => {
    try {
      await toggleFollow();
    } catch (err) {
    } finally {
      unfollowModal.onClose();
    }
  }, [toggleFollow]);

  return (
    <ConfirmModalLayout
      title={`Unfollow @${data?.name}`}
      description="Their Tweets will no longer show up in your home timeline. You can still view their profile, unless their Tweets are protected."
      actionLabel="Unfollow"
      onClose={unfollowModal.onClose}
      onSubmit={handleSubmit}
      isOpen={unfollowModal.isOpen}
    />
  );
};

export default UnfollowModal;
