import React, { useCallback } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";

export type AvatarProps = {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
};

const Avatar: React.FunctionComponent<AvatarProps> = ({
  userId,
  isLarge,
  hasBorder,
}) => {
  const { data: fetchetUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
      ${hasBorder ? "border-4 border-black" : ""} 
      ${isLarge ? "h-32 " : "h-10"}
      ${isLarge ? "w-32 " : "w-10"}
      rounded-full hover:opacity-90 transition cursor-pointer relative
      `}
    >
      <Image
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="Avatar"
        onClick={onClick}
        src={fetchetUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
