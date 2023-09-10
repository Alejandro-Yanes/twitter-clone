import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Header label="home" />
    </main>
  );
}
