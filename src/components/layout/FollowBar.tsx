import FollowBarItem from "../FollowBarItem";
import React from "react";
import { useRouter } from "next/router";
import useUsers from "@/hooks/useUsers";

export interface FollowBarProps {}

const FollowBar: React.FunctionComponent<FollowBarProps> = (props) => {
  const { data: users = [] } = useUsers();
  const router = useRouter();

  if (users.length === 0) return null;

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl overflow-hidden ">
        <div className="p-4">
          <h2 className="text-white text-xl font-bold">You might like</h2>
        </div>
        <div className="flex flex-col ">
          {users.map((user) => (
            <FollowBarItem user={user} />
          ))}
        </div>
        <div
          className="p-4 hover:bg-neutral-700 transition-colors cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="text-sky-500 ">Show more</span>
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
