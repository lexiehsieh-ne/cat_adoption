import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatchGame from "@/components/CatchGame";

export const metadata: Metadata = {
  title: "接小貓小遊戲 | 玳瑁姊妹貓送養",
  description: "15 秒接小貓小遊戲，純娛樂放鬆一下，順便認識小玳、小瑁！",
};

export default function GamePage() {
  return (
    <div className="relative flex min-h-screen flex-col text-stone-800">
      <Header />

      <main className="mx-auto flex w-[92%] max-w-3xl flex-1 flex-col gap-10 pb-24 pt-16">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
            Just for Fun
          </span>
          <h1 className="text-balance font-display text-5xl leading-[0.95] tracking-tight text-stone-900 sm:text-6xl">
            接小貓
            <em className="italic text-stone-700"> 小遊戲 </em>
          </h1>
          <p className="max-w-md text-sm leading-7 text-stone-600">
            單純娛樂一下：15 秒內用貓抓籃接住越多小貓越好，跟小玳、小瑁培養默契。
          </p>
        </div>

        <CatchGame />
      </main>

      <Footer />
    </div>
  );
}
