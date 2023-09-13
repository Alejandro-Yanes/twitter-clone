import React, { useCallback, useState } from "react";

import Avatar from "./Avatar";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/zustand/useLoginModal";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/zustand/useRegisterModal";

export type FormProps = {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
};

const Form: React.FunctionComponent<FormProps> = ({
  placeholder,
  isComment,
  postId,
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";
      const successMessage = isComment ? `Comment created` : "Tweet Created";

      await axios.post(url, { body });

      toast.success(successMessage);
      setBody("");
      mutatePosts();
      if (isComment) {
        mutatePost();
      }
    } catch (err) {
      const ErrorMessage = isComment
        ? `Comment not created`
        : "Tweet not Created";
      console.log(err);
      toast.error(ErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [body, setBody, mutatePosts, setIsLoading, isComment, mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4 ">
          <div>
            <Avatar userId={currentUser.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Tweet"
                medium
                secondary
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-bold text-white mb-4 text-2xl">
            Welcome to twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} medium terciary />
            <Button
              label="Register"
              secondary
              onClick={registerModal.onOpen}
              medium
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
