"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CatIcon, { randomCatVariant, type CatVariant } from "@/components/CatIcon";

type FallingItem = {
  id: number;
  x: number;
  y: number;
  speed: number;
  variant: CatVariant;
};

const GAME_SECONDS = 15;
const CATCHER_WIDTH = 72;
const CATCHER_HEIGHT = 44;
const ITEM_SIZE = 34;

function scoreMessage(score: number) {
  if (score >= 18) return "神級貓咪接殺手！🏆";
  if (score >= 12) return "手感超穩，小玳小瑁都佩服！";
  if (score >= 6) return "還不錯喔，再接再厲！";
  return "貓咪們都溜走了，再試一次吧！";
}

export default function CatchGame() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<"idle" | "playing" | "ended">("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [catcherX, setCatcherX] = useState(0);

  const itemsRef = useRef<FallingItem[]>([]);
  const catcherXRef = useRef(0);
  const scoreRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const lastRef = useRef(0);
  const nextSpawnRef = useRef(0);
  const idCounterRef = useRef(0);

  const getSize = useCallback(() => {
    const el = containerRef.current;
    if (!el) return { w: 320, h: 420 };
    return { w: el.clientWidth, h: el.clientHeight };
  }, []);

  const setCatcher = useCallback((x: number) => {
    catcherXRef.current = x;
    setCatcherX(x);
  }, []);

  const movePointer = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = clientX - rect.left;
      const clamped = Math.min(
        Math.max(relX, CATCHER_WIDTH / 2),
        rect.width - CATCHER_WIDTH / 2
      );
      setCatcher(clamped);
    },
    [setCatcher]
  );

  const startGame = () => {
    const { w } = getSize();
    itemsRef.current = [];
    scoreRef.current = 0;
    idCounterRef.current = 0;
    setItems([]);
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setCatcher(w / 2);
    startRef.current = performance.now();
    lastRef.current = startRef.current;
    nextSpawnRef.current = startRef.current + 300;
    setStatus("playing");
  };

  useEffect(() => {
    if (status !== "playing") return;

    const loop = (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;

      const elapsed = (now - startRef.current) / 1000;
      const remaining = Math.max(0, GAME_SECONDS - elapsed);
      setTimeLeft((prev) => {
        const rounded = Math.ceil(remaining);
        return rounded !== prev ? rounded : prev;
      });

      const { w, h } = getSize();
      const catchLineY = h - CATCHER_HEIGHT - ITEM_SIZE / 2;

      if (now >= nextSpawnRef.current) {
        idCounterRef.current += 1;
        const x = Math.random() * (w - ITEM_SIZE) + ITEM_SIZE / 2;
        const speed = 90 + Math.random() * 100;
        itemsRef.current = [
          ...itemsRef.current,
          { id: idCounterRef.current, x, y: -ITEM_SIZE, speed, variant: randomCatVariant() },
        ];
        nextSpawnRef.current = now + 500 + Math.random() * 400;
      }

      let caughtCount = 0;
      const nextItems: FallingItem[] = [];
      for (const item of itemsRef.current) {
        const newY = item.y + item.speed * dt;
        const withinCatchZone = newY >= catchLineY;
        const alignedWithCatcher =
          Math.abs(item.x - catcherXRef.current) <
          CATCHER_WIDTH / 2 + ITEM_SIZE / 2 - 8;

        if (withinCatchZone && alignedWithCatcher) {
          caughtCount += 1;
          continue;
        }
        if (newY > h + ITEM_SIZE) continue;
        nextItems.push({ ...item, y: newY });
      }
      itemsRef.current = nextItems;
      setItems(nextItems);

      if (caughtCount > 0) {
        scoreRef.current += caughtCount;
        setScore(scoreRef.current);
      }

      if (remaining <= 0) {
        setBest((b) => Math.max(b, scoreRef.current));
        setStatus("ended");
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [status, getSize]);

  useEffect(() => {
    if (status !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const { w } = getSize();
      const step = 32;
      if (e.key === "ArrowLeft") {
        setCatcher(Math.max(CATCHER_WIDTH / 2, catcherXRef.current - step));
      } else if (e.key === "ArrowRight") {
        setCatcher(Math.min(w - CATCHER_WIDTH / 2, catcherXRef.current + step));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, getSize, setCatcher]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.15em] text-stone-600">
        <span>
          得分 <span className="text-stone-900">{score}</span>
        </span>
        <span>
          剩餘時間 <span className="text-stone-900">{timeLeft}</span> 秒
        </span>
      </div>

      <div
        ref={containerRef}
        onPointerMove={(e) => status === "playing" && movePointer(e.clientX)}
        className="corner-ticks relative h-[420px] w-full touch-none select-none overflow-hidden border border-stone-800/20 bg-[#f6f0e2] shadow-[8px_8px_0_0_rgba(51,42,34,0.1)] sm:h-[460px]"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(51,42,34,0.06) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {status === "playing" &&
          items.map((item) => (
            <div
              key={item.id}
              className="absolute drop-shadow-sm"
              style={{
                left: item.x,
                top: item.y,
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                transform: "translate(-50%, -50%)",
              }}
            >
              <CatIcon variant={item.variant} className="h-full w-full" />
            </div>
          ))}

        {status === "playing" && (
          <div
            className="absolute bottom-3 flex items-center justify-center border border-stone-800 bg-[#f1ead9] text-2xl shadow-[3px_3px_0_0_rgba(51,42,34,0.15)]"
            style={{
              left: catcherX,
              width: CATCHER_WIDTH,
              height: CATCHER_HEIGHT,
              transform: "translateX(-50%)",
            }}
          >
            🧺
          </div>
        )}

        {status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-4xl">🐾</p>
            <h3 className="font-display text-2xl italic text-stone-900">
              接住掉下來的小貓！
            </h3>
            <p className="max-w-xs text-sm leading-6 text-stone-600">
              移動滑鼠或手指控制下方的貓抓籃，在 15 秒內盡量接住越多小貓越好。
              （鍵盤也可以用左右方向鍵）
            </p>
            <button
              type="button"
              onClick={startGame}
              className="border border-stone-800 bg-stone-800 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[#f1ead9] transition hover:bg-stone-700"
            >
              開始遊戲
            </button>
          </div>
        )}

        {status === "ended" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#f6f0e2]/95 px-6 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
              Time&apos;s Up
            </span>
            <p className="font-display text-5xl italic text-stone-900">{score}</p>
            <p className="text-sm text-stone-600">{scoreMessage(score)}</p>
            {best > 0 && (
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500">
                本次最佳紀錄 {best} 隻
              </p>
            )}
            <button
              type="button"
              onClick={startGame}
              className="mt-2 border border-stone-800 bg-stone-800 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[#f1ead9] transition hover:bg-stone-700"
            >
              再玩一次
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
