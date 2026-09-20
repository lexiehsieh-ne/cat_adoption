import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | 玳瑁姊妹貓送養`,
    description: post.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const index = posts.findIndex((p) => p.slug === slug);
  const next = posts[(index + 1) % posts.length];

  return (
    <div className="relative flex min-h-screen flex-col text-stone-800">
      <Header />

      <main className="mx-auto flex w-[92%] max-w-3xl flex-1 flex-col gap-10 pb-24 pt-16">
        <Link
          href="/blog"
          className="w-fit font-mono text-xs uppercase tracking-[0.15em] text-stone-500 transition hover:text-stone-900"
        >
          ← 回部落格
        </Link>

        <article className="flex flex-col gap-8">
          <header className="flex flex-col gap-4 border-b border-stone-800/15 pb-8">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500">
              <span>{post.tag}</span>
              <span aria-hidden>·</span>
              <span>{post.date}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-balance font-display text-4xl leading-tight text-stone-900 sm:text-5xl">
              {post.title}
            </h1>
          </header>

          <div className="flex flex-col gap-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-base leading-8 text-stone-700">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-6 flex flex-col gap-6 border-t border-stone-800/15 pt-10">
          <div className="corner-ticks border border-stone-800/20 bg-[#f6f0e2] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500">
              Cat Sanctuary Taipei
            </p>
            <p className="mt-2 font-display text-2xl italic text-stone-900">
              小玳和小瑁還在等一個家。
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-stone-600">
              如果讀完這篇文章，你想更認識這對玳瑁姊妹，歡迎到首頁看看牠們的自我介紹。
            </p>
            <Link
              href="/#contact"
              className="mt-4 inline-block border border-stone-800 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-stone-800 transition hover:bg-stone-800 hover:text-[#f1ead9]"
            >
              我想認養姊妹倆
            </Link>
          </div>

          <Link
            href={`/blog/${next.slug}`}
            className="group flex items-center justify-between gap-4 border-t border-stone-800/15 pt-6"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-stone-500">
                下一篇
              </span>
              <span className="font-display text-xl text-stone-900 transition group-hover:text-stone-600">
                {next.title}
              </span>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-stone-700">
              →
            </span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
