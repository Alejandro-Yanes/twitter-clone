import React, { useEffect } from "react";

import { BsTwitter } from "react-icons/bs";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotifications";

export type NotificationsFeedProps = {};

const NotificationsFeed: React.FunctionComponent<NotificationsFeedProps> = (
  props
) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotification(
    currentUser?.id as string
  );

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length == 0)
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No Notifications
      </div>
    );

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter size={30} color="white" />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
