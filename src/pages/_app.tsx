import "@/styles/globals.css";

import type { AppProps } from "next/app";
import CreatePostModal from "@/components/modals/CreatePostModal";
import DeletePostModal from "@/components/modals/DeletePostModal";
import EditModal from "@/components/modals/EditModal";
import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import UnfollowModal from "@/components/modals/UnfollowModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster position="bottom-center" />
      <CreatePostModal />
      <UnfollowModal />
      <DeletePostModal />
      <EditModal />
      <LoginModal />
      <RegisterModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
