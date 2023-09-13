import React, { useCallback, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import Avatar from "../Avatar";
import Button from "../Button";
import Input from "../Input";
import InputModalLayout from "./Layouts/InputModalLayout";
import axios from "axios";
import toast from "react-hot-toast";
import useCreatePostModal from "@/hooks/zustand/useCreatePostModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";

export type CreatePostModalProps = {};

const CreatePostModal: React.FunctionComponent<CreatePostModalProps> = (
  props
) => {
  const { data: currentUser } = useCurrentUser();
  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePostsForThisUser } = usePosts(currentUser?.id);
  const createPostModal = useCreatePostModal();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/posts", { body });

      toast.success("Tweet Created");

      mutatePosts();
      mutatePostsForThisUser();
      createPostModal.onClose();
    } catch (err) {
      toast.error("Error creating post");
    } finally {
      setIsLoading(false);
    }
  }, [
    setIsLoading,
    toast,
    createPostModal,
    body,
    mutatePosts,
    mutatePostsForThisUser,
  ]);

  const bodyContent = (
    <textarea
      disabled={isLoading}
      onChange={(e) => setBody(e.target.value)}
      value={body}
      className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
      placeholder="What is happening?"
    ></textarea>
  );

  const handleClose = useCallback(() => {
    createPostModal.onClose();
  }, [createPostModal.onClose]);

  if (!createPostModal.isOpen) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/* content */}

          <div className="h-full lg:h-auto border-0 rounded-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-center justify-end p-2 rounded-t">
              <button
                className="p-1 ml-auto border-0 text-white hover:opacity-70 transition"
                onClick={handleClose}
              >
                <AiOutlineClose size={20} color="white" />
              </button>
            </div>
            {/* body */}
            <div className="p-2">
              <div className="relative px-4 flex gap-3 border-b  ">
                <Avatar userId={currentUser?.id as string} />
                {bodyContent}
              </div>
              {/* footer */}

              <div className="flex justify-end py-2 ">
                <Button
                  disabled={isLoading || !body}
                  label="Post"
                  onClick={onSubmit}
                  secondary
                  medium
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;
