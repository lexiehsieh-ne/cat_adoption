import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-800/15">
      <div className="mx-auto w-[92%] max-w-5xl py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="font-display text-xl italic text-stone-900">
              玳瑁姊妹
            </span>
            <p className="text-sm leading-6 text-stone-600">
              小玳、小瑁是一對感情深厚的玳瑁貓姊妹，
              希望能找到願意用心陪伴牠們一輩子的家人。
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone-800">
              快速連結
            </span>
            <Link href="/#about" className="text-sm text-stone-600 transition hover:text-stone-900">
              自我介紹
            </Link>
            <Link href="/#traits" className="text-sm text-stone-600 transition hover:text-stone-900">
              健康個性
            </Link>
            <Link href="/#conditions" className="text-sm text-stone-600 transition hover:text-stone-900">
              認養須知
            </Link>
            <Link href="/#booking" className="text-sm text-stone-600 transition hover:text-stone-900">
              預約看貓咪
            </Link>
            <Link href="/blog" className="text-sm text-stone-600 transition hover:text-stone-900">
              部落格
            </Link>
            <Link href="/game" className="text-sm text-stone-600 transition hover:text-stone-900">
              小遊戲
            </Link>
            <Link href="/#contact" className="text-sm text-stone-600 transition hover:text-stone-900">
              聯絡我們
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone-800">
              聯絡方式
            </span>
            <p className="text-sm text-stone-600">📱 LINE：（請填入）</p>
            <p className="text-sm text-stone-600">✉️ Email：（請填入）</p>
            <p className="text-sm text-stone-600">📍 地區：（請填入）</p>
          </div>
        </div>
        <div className="mt-8 border-t border-stone-800/15 pt-5 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500">
          領養代替購買 · © {new Date().getFullYear()} 玳瑁姊妹貓送養
        </div>
      </div>
    </footer>
  );
}
