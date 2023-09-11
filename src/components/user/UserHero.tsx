import useUser from "@/hooks/useUser";
import Image from "next/image";
import React from "react";
import Avatar from "../Avatar";

export type UserHeroProps = {
  userId: string;
};

const UserHero: React.FunctionComponent<UserHeroProps> = ({ userId }) => {
  const { data: fetcherUser } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetcherUser?.coverImage && (
          <Image
            fill
            src={fetcherUser.coverImage}
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
