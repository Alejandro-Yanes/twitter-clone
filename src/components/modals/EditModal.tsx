import React, { useCallback, useEffect, useState } from "react";

import ImageUpload from "../ImageUpload";
import Input from "../Input";
import Modal from "./Layouts/InputModalLayout";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/zustand/useEditModal";
import useRegisterModal from "@/hooks/zustand/useRegisterModal";
import useUser from "@/hooks/useUser";

export interface Props {}

const EditModal: React.FunctionComponent<Props> = (props) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetcherUser } = useUser(currentUser?.id!);
  const editModal = useEditModal();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setCoverImage(currentUser?.coverImage || "");
    setName(currentUser?.name || "");
    setUsername(currentUser?.username || "");
    setBio(currentUser?.bio || "");
    setProfileImage(currentUser?.profileImage || "");
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      toast.success("updated");

      mutateFetcherUser();
      editModal.onClose();
    } catch (err) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [editModal, name, username, bio, profileImage, coverImage]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        type="text"
        value={bio}
        disabled={isLoading}
      />
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      body={bodyContent}
      onSubmit={onSubmit}
      actionLabel="Save"
      title="Edit Your profile"
    />
  );
};

export default EditModal;
