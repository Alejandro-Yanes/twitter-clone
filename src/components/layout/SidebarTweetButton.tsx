import useLoginModal from "@/hooks/zustand/useLoginModal";
import React, { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

export interface SidebarTweetButtonProps {}

const SidebarTweetButton: React.FunctionComponent<SidebarTweetButtonProps> = (
  props
) => {
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    loginModal.onOpen();
  }, []);
  return (
    <button onClick={handleClick} className="w-[100%]">
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </button>
  );
};

export default SidebarTweetButton;
