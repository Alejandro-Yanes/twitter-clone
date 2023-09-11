import useUsers from "@/hooks/useUsers";
import React from "react";
import Avatar from "../Avatar";
import { User } from "@prisma/client";

export interface FollowBarProps {}

const FollowBar: React.FunctionComponent<FollowBarProps> = (props) => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) return null;

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user) => (
            <div className="flex items-center gap-6" key={user.id}>
              <div className="flex flex-col gap-6 ">
                <Avatar userId={user.id} key={user.id} />
              </div>
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm capitalize">
                  {user.name}
                </p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
