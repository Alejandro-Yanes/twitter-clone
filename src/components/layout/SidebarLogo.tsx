import { BsTwitter } from "react-icons/bs";
import React from "react";
import { useRouter } from "next/router";

export interface Props {}

const SidebarLogo: React.FunctionComponent<Props> = (props) => {
  const router = useRouter();

  return (
    <button
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition"
      onClick={() => router.push("/")}
    >
      <BsTwitter size={28} color="white" />
    </button>
  );
};

export default SidebarLogo;
