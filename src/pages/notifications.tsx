import Header from "@/components/Header";
import { NextPageContext } from "next";
import NotificationsFeed from "@/components/NotificationsFeed";
import React from "react";
import { getSession } from "next-auth/react";

export type NotificationsViewProps = {};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const NotificationsView: React.FunctionComponent<NotificationsViewProps> = (
  props
) => {
  return (
    <>
      <Header label="Notifications" showBackArror />
      <NotificationsFeed />
    </>
  );
};

export default NotificationsView;
