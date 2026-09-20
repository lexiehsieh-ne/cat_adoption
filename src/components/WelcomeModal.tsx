"use client";

import { useState } from "react";
import { useUserName } from "@/components/UserName";

export default function WelcomeModal() {
  const { name, ready, dismissed, setName, dismiss } = useUserName();
  const [value, setValue] = useState("");

  const open = ready && !name && !dismissed;

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    setName(trimmed.slice(0, 20));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="輸入你的稱呼"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]" />

      <div className="corner-ticks relative w-full max-w-sm border border-stone-800/20 bg-[#f6f0e2] p-7 shadow-[10px_10px_0_0_rgba(51,42,34,0.15)] sm:p-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
          Welcome
        </span>

        <p className="mt-4 text-4xl">🐾</p>
        <h2 className="mt-3 font-display text-2xl italic text-stone-900">
          在開始逛之前，
          <br />
          怎麼稱呼你呢？
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          小玳跟小瑁想知道，是誰來看牠們了。
        </p>

        <form onSubmit={submit} className="mt-5 flex flex-col gap-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="你的暱稱"
            maxLength={20}
            autoFocus
            className="w-full border-b border-stone-800/40 bg-transparent px-1 py-2 text-stone-900 placeholder:text-stone-400 focus:border-stone-800 focus:outline-none"
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="submit"
              disabled={!value.trim()}
              className="flex-1 border border-stone-800 bg-stone-800 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-[#f1ead9] transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              進入網站 →
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="font-mono text-xs uppercase tracking-[0.15em] text-stone-500 transition hover:text-stone-900"
            >
              先隨便看看
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
