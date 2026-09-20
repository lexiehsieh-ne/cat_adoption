"use client";

import { useUserName } from "@/components/UserName";

export default function WelcomeBar() {
  const { name, dismiss } = useUserName();

  if (!name) return null;

  return (
    <div className="flex items-center justify-center gap-3 bg-stone-800 px-[4%] py-2 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-[#f1ead9]">
      <span>嗨，{name}，歡迎來看看小玳和小瑁 🐾</span>
      <button
        type="button"
        aria-label="關閉歡迎訊息"
        onClick={dismiss}
        className="text-[#f1ead9]/60 transition hover:text-[#f1ead9]"
      >
        ✕
      </button>
    </div>
  );
}
