import { BsBell, BsBellFill, BsHouse, BsHouseFill } from "react-icons/bs";
import React, { useCallback } from "react";

import { BiLogOut } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

export interface Props {}

const Sidebar: React.FunctionComponent<Props> = (props) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouse,
      iconFill: BsHouseFill,
      auth: false,
      alert: false,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBell,
      iconFill: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification || false,
    },
    {
      label: "Profile",
      href: `/${currentUser?.id}`,
      icon: BsHouse,
      iconFill: BsHouseFill,
      auth: true,
      alert: false,
    },
  ];

  const handleLogout = useCallback(() => {
    signOut();
    router.push("/");
  }, []);

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              label={item.label}
              icon={item.icon}
              href={item.href}
              onClick={() => {}}
              auth={item.auth}
              alert={item.alert}
              iconFill={item.iconFill}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={handleLogout}
              icon={BiLogOut}
              label="Logout"
              iconFill={BiLogOut}
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
