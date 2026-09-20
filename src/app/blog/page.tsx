import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SectionHeading } from "@/components/Typography";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "部落格 | 玳瑁姊妹貓送養",
  description: "關於玳瑁貓的花色、個性與領養須知，寫給準備認養小玳、小瑁的你。",
};

export default function BlogIndex() {
  return (
    <div className="relative flex min-h-screen flex-col text-stone-800">
      <Header />

      <main className="mx-auto flex w-[92%] max-w-5xl flex-1 flex-col gap-14 pb-24 pt-16">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
            Journal
          </span>
          <h1 className="text-balance font-display text-5xl leading-[0.95] tracking-tight text-stone-900 sm:text-6xl">
            玳瑁貓
            <em className="italic text-stone-700"> 觀察筆記 </em>
          </h1>
          <p className="max-w-md text-sm leading-7 text-stone-600">
            寫給準備認養小玳、小瑁的你——關於玳瑁貓花色從哪裡來、個性是不是真的很有個性，
            以及認養前值得先知道的幾件事。
          </p>
        </div>

        <SectionHeading index="04" kicker="Articles" title="全部文章" />

        <ul className="flex flex-col">
          {posts.map((post) => (
            <li key={post.slug} className="border-t border-stone-800/15 py-8 first:border-t">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-4 sm:grid-cols-[5rem_1fr]"
              >
                <span className="font-display text-4xl text-stone-300 transition group-hover:text-stone-500 sm:text-5xl">
                  {post.no}
                </span>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500">
                    <span>{post.tag}</span>
                    <span aria-hidden>·</span>
                    <span>{post.date}</span>
                    <span aria-hidden>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-display text-2xl text-stone-900 transition group-hover:text-stone-600 sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="max-w-xl text-sm leading-7 text-stone-600">
                    {post.excerpt}
                  </p>
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-stone-700">
                    閱讀全文 →
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <div className="border-t border-stone-800/15" />
        </ul>
      </main>

      <Footer />
    </div>
  );
}
