import { Inter } from "next/font/google";
import ChatStream from "@/components/ChatStream";
import ChatDefault from "@/components/ChatDefault";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} h-screen w-full flex justify-center items-center`}
    >
      <ChatStream />
      <div className="h-[420px] w-[1px] bg-gray-200 mx-10" />
      <ChatDefault />
    </main>
  );
}
