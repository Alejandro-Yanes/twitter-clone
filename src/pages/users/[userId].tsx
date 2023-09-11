import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/user/UserBio";
import UserHero from "@/components/user/UserHero";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

export type UserViewProps = {};

const UserView: React.FunctionComponent<UserViewProps> = (props) => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header
        label={
          typeof fetchedUser?.name === "string"
            ? fetchedUser?.name
            : "User Profile"
        }
        showBackArror
      />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
