"use client";

import { useEffect, useState } from "react";

type Stage = "idle" | "drawing" | "result";

const WIN_CHANCE = 0.1;

function makeRedeemCode() {
  return `WIN-${Date.now().toString(36).toUpperCase().slice(-5)}`;
}

export default function LuckyDraw() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [win, setWin] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const reset = () => {
    setStage("idle");
    setWin(false);
    setCode("");
  };

  const close = () => {
    setOpen(false);
    reset();
  };

  const draw = () => {
    setStage("drawing");
    window.setTimeout(() => {
      const didWin = Math.random() < WIN_CHANCE;
      setWin(didWin);
      if (didWin) setCode(makeRedeemCode());
      setStage("result");
    }, 900);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-30 border border-stone-800 bg-[#f1ead9] px-4 py-3 font-mono text-xs uppercase tracking-[0.15em] text-stone-800 shadow-[4px_4px_0_0_rgba(51,42,34,0.15)] transition hover:bg-stone-800 hover:text-[#f1ead9] sm:px-5"
      >
        🎁 抽獎試手氣
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="抽獎小程式"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="關閉抽獎視窗"
            onClick={close}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]"
          />

          <div className="corner-ticks relative w-full max-w-sm border border-stone-800/20 bg-[#f6f0e2] p-7 shadow-[10px_10px_0_0_rgba(51,42,34,0.15)] sm:p-8">
            <button
              type="button"
              aria-label="關閉"
              onClick={close}
              className="absolute right-4 top-4 font-mono text-xs uppercase tracking-[0.15em] text-stone-500 transition hover:text-stone-900"
            >
              ✕
            </button>

            <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
              Lucky Draw
            </span>

            {stage === "idle" && (
              <div className="mt-4 flex flex-col gap-5">
                <p className="text-5xl">🎰</p>
                <h2 className="font-display text-2xl italic text-stone-900">
                  試手氣抽獎
                </h2>
                <p className="text-sm leading-6 text-stone-600">
                  每次抽獎有 10% 機率抽中「貓飼料一包」，
                  幫小玳、小瑁的朋友們加加菜！祝你好運。
                </p>
                <button
                  type="button"
                  onClick={draw}
                  className="border border-stone-800 bg-stone-800 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[#f1ead9] transition hover:bg-stone-700"
                >
                  開始抽獎
                </button>
              </div>
            )}

            {stage === "drawing" && (
              <div className="mt-4 flex flex-col items-center gap-5 py-6 text-center">
                <p className="animate-pulse text-5xl">🐾</p>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500">
                  抽獎中⋯⋯
                </p>
              </div>
            )}

            {stage === "result" && win && (
              <div className="mt-4 flex flex-col gap-4">
                <p className="text-5xl">🎉</p>
                <h2 className="font-display text-3xl italic text-stone-900">
                  恭喜中獎！
                </h2>
                <p className="text-sm leading-6 text-stone-600">
                  你抽中了一包<strong className="text-stone-800">貓飼料</strong>！
                  請截圖這個畫面，透過下方聯絡方式跟我們兌獎。
                </p>
                <div className="border border-dashed border-stone-800/40 px-4 py-3 text-center font-mono text-sm tracking-[0.2em] text-stone-800">
                  {code}
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={reset}
                    className="flex-1 border border-stone-800 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-stone-800 transition hover:bg-stone-800 hover:text-[#f1ead9]"
                  >
                    再抽一次
                  </button>
                  <a
                    href="/#contact"
                    onClick={close}
                    className="flex-1 border border-stone-800 bg-stone-800 px-5 py-2.5 text-center font-mono text-xs uppercase tracking-[0.15em] text-[#f1ead9] transition hover:bg-stone-700"
                  >
                    前往兌獎
                  </a>
                </div>
              </div>
            )}

            {stage === "result" && !win && (
              <div className="mt-4 flex flex-col gap-4">
                <p className="text-5xl">🐈</p>
                <h2 className="font-display text-2xl italic text-stone-900">
                  謝謝參與
                </h2>
                <p className="text-sm leading-6 text-stone-600">
                  這次沒有抽中，差一點點，要不要再試一次手氣？
                </p>
                <button
                  type="button"
                  onClick={draw}
                  className="border border-stone-800 bg-stone-800 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[#f1ead9] transition hover:bg-stone-700"
                >
                  再抽一次
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
