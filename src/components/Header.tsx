"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#about", label: "自我介紹" },
  { href: "/#traits", label: "健康個性" },
  { href: "/#conditions", label: "認養須知" },
  { href: "/#booking", label: "預約看貓咪" },
  { href: "/blog", label: "部落格" },
  { href: "/game", label: "小遊戲" },
  { href: "/#contact", label: "聯絡我們" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-stone-800/15 bg-[#f1ead9]/90 backdrop-blur-sm">
      <div className="mx-auto flex w-[92%] max-w-5xl items-center justify-between gap-3 py-4">
        <Link
          href="/"
          className="flex min-w-0 items-baseline gap-2 font-display text-base italic text-stone-900 sm:text-lg"
        >
          <span className="truncate">玳瑁姊妹</span>
          <span className="hidden font-mono text-[10px] not-italic uppercase tracking-[0.2em] text-stone-500 sm:inline">
            Cat Sanctuary Taipei
          </span>
        </Link>

        <nav className="hidden items-center gap-5 font-mono text-xs uppercase tracking-[0.15em] text-stone-600 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-stone-900">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="hidden border border-stone-800 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-stone-800 transition hover:bg-stone-800 hover:text-[#f1ead9] sm:inline-block"
          >
            立即聯絡
          </Link>
          <button
            type="button"
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 border border-stone-800 lg:hidden"
          >
            <span
              className={`h-px w-4 bg-stone-800 transition ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-stone-800 transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-stone-800/15 bg-[#f1ead9] font-mono text-sm uppercase tracking-[0.15em] text-stone-700 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-stone-800/10 px-[4%] py-4 transition hover:bg-stone-800/5"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="px-[4%] py-4 text-stone-900"
          >
            立即聯絡 →
          </Link>
        </nav>
      )}
    </header>
  );
}
