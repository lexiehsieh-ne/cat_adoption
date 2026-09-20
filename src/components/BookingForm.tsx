"use client";

import { useEffect, useState } from "react";
import { useUserName } from "@/components/UserName";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm() {
  const { name } = useUserName();
  const [nameInput, setNameInput] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = EMAIL_PATTERN.test(visitorEmail.trim());
  const showEmailError = emailTouched && visitorEmail.trim().length > 0 && !isEmailValid;

  useEffect(() => {
    if (name) setNameInput((prev) => prev || name);
  }, [name]);

  useEffect(() => {
    if (!submitted) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSubmitted(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) {
      setEmailTouched(true);
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
    <div className="corner-ticks border border-stone-800/20 bg-[#f6f0e2] p-7 shadow-[8px_8px_0_0_rgba(51,42,34,0.1)] sm:p-9">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500">
              稱呼
            </span>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="怎麼稱呼你"
              maxLength={20}
              className="border-b border-stone-800/40 bg-transparent px-1 py-2 text-stone-900 placeholder:text-stone-400 focus:border-stone-800 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500">
              Email <span className="text-stone-800">*</span>
            </span>
            <input
              type="text"
              required
              value={visitorEmail}
              onChange={(e) => setVisitorEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="你的 Email"
              maxLength={60}
              aria-invalid={showEmailError}
              className={`border-b bg-transparent px-1 py-2 text-stone-900 placeholder:text-stone-400 focus:outline-none ${
                showEmailError
                  ? "border-red-700 focus:border-red-700"
                  : "border-stone-800/40 focus:border-stone-800"
              }`}
            />
            {showEmailError && (
              <span className="font-mono text-[11px] text-red-700">
                請輸入正確的 Email 格式
              </span>
            )}
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500">
            想說的話（選填）
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="想約什麼時候方便看貓咪、有什麼想先讓我們知道的，都可以寫在這裡"
            rows={3}
            maxLength={300}
            className="resize-none border border-stone-800/30 bg-transparent px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-800 focus:outline-none"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={!isEmailValid}
            className="border border-stone-800 bg-stone-800 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[#f1ead9] transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            送出預約 →
          </button>
        </div>
      </form>
    </div>

    {submitted && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="預約已送出"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <button
          type="button"
          aria-label="關閉"
          onClick={() => setSubmitted(false)}
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]"
        />

        <div className="corner-ticks relative w-full max-w-sm border border-stone-800/20 bg-[#f6f0e2] p-7 text-center shadow-[10px_10px_0_0_rgba(51,42,34,0.15)] sm:p-8">
          <p className="text-4xl">🐾</p>
          <h2 className="mt-3 font-display text-2xl italic text-stone-900">
            預約已送出
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            已經收到你的資料了，請耐心等待我們的好消息
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-5 border border-stone-800 bg-stone-800 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-[#f1ead9] transition hover:bg-stone-700"
          >
            關閉
          </button>
        </div>
      </div>
    )}
    </>
  );
}
