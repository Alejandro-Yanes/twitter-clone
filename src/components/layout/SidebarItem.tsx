import React, { useCallback } from "react";

import { BsDot } from "react-icons/bs";
import type { IconType } from "react-icons";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/zustand/useLoginModal";
import { useRouter } from "next/router";

type SidebarItemProps = {
  label?: string;
  href?: string;
  icon: IconType;
  onClick: () => void;
  auth?: boolean;
  alert?: boolean;
  iconFill: IconType;
};

const SidebarItem: React.FunctionComponent<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
  iconFill: IconFill,
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [onClick, href, loginModal, auth, currentUser]);

  const validator = router.asPath === href;

  return (
    <button className="flex flex-row items-center" onClick={handleClick}>
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        {validator ? (
          <IconFill size={24} color="white" />
        ) : (
          <Icon size={24} color="white" />
        )}

        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </button>
  );
};

export default SidebarItem;
