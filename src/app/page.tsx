import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Parallax from "@/components/Parallax";
import { SectionHeading, Leader } from "@/components/Typography";
import BookingForm from "@/components/BookingForm";

const traits = [
  { no: "01", title: "感情超好的姊妹", desc: "從小一起長大，會互相幫忙梳毛、打鬧、抱在一起睡覺，形影不離。" },
  { no: "02", title: "血檢過關", desc: "已完成血液檢查，體內外驅蟲也已完成，精神好、食慾佳。" },
  { no: "03", title: "第一劑預防針已完成", desc: "已施打第一劑預防針，後續依時程回診追加。" },
  { no: "04", title: "已經會用貓砂", desc: "幼貓時期就養成好習慣，上廁所不用煩惱。" },
];

const profiles = [
  {
    name: "小玳",
    role: "姊姊",
    id: "No. 2026-0901-A",
    src: "/images/older.jpg",
    offset: "",
    fields: [
      { label: "性別", value: "女生" },
      { label: "年齡", value: "約 3 個月" },
      { label: "體型", value: "約 1.6kg" },
      { label: "個性", value: "沉穩觀察、慢熟" },
    ],
  },
  {
    name: "小瑁",
    role: "妹妹",
    id: "No. 2026-0901-B",
    src: "/images/young.jpg",
    offset: "md:mt-16",
    fields: [
      { label: "性別", value: "女生" },
      { label: "年齡", value: "約 3 個月" },
      { label: "體型", value: "約 1.9kg" },
      { label: "個性", value: "活潑好奇、愛探索" },
    ],
  },
];

const conditions = [
  "年滿 25 歲，收入穩定",
  "需施打晶片疫苗，並於適合年齡完成絕育",
  "同意接受家訪",
  "認養後需配合定期追蹤",
  "需簽署認養同意書",
  "恕不接受情侶、套房環境",
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col text-stone-800">
      <Header />

      <main className="mx-auto flex w-[92%] max-w-5xl flex-1 flex-col gap-32 pb-24 pt-16">
        {/* hero */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
              誠徵一個溫暖的家 · 台北市松山區
            </span>
            <h1 className="text-balance font-display text-5xl leading-[0.95] tracking-tight text-stone-900 sm:text-7xl md:text-8xl">
              遇見一對
              <em className="italic text-stone-700"> 玳瑁小天使 </em>
              姊妹
            </h1>
          </div>

          <div className="grid gap-10 md:grid-cols-12">
            <div className="flex flex-col justify-between gap-8 md:col-span-4 md:pb-6">
              <p className="max-w-sm text-base leading-8 text-stone-600">
                我們是「小玳」和「小瑁」，一對身上有著獨一無二黑橘花紋的玳瑁貓咪姊妹，
                目前約 3 個月，正值活潑愛玩又黏人的年紀。從出生就形影不離，
                最理想的狀況是能一起被同一個家庭認養，正在等待願意疼愛我們一輩子的溫暖的家。
              </p>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <a
                  href="#contact"
                  className="border border-stone-800 bg-stone-800 px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.15em] text-[#f1ead9] transition hover:bg-stone-700"
                >
                  我想認養姊妹倆
                </a>
                <a
                  href="#about"
                  className="border border-stone-800 px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.15em] text-stone-800 transition hover:bg-stone-800 hover:text-[#f1ead9]"
                >
                  認識姊妹倆
                </a>
              </div>
            </div>

            <div className="relative md:col-span-8 md:mt-6">
              <Parallax
                speed={-0.35}
                baseRotate={-1}
                rotate={1}
                className="corner-ticks border border-stone-800/20 bg-[#f6f0e2] p-3 shadow-[10px_10px_0_0_rgba(51,42,34,0.1)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/pic3.png"
                    alt="小玳與小瑁，一對玳瑁貓姊妹"
                    fill
                    priority
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="object-cover grayscale-[10%]"
                  />
                </div>
              </Parallax>
              <Parallax
                speed={0.5}
                baseRotate={3}
                rotate={5}
                className="absolute -top-4 -left-4 border border-stone-800 bg-[#f1ead9] px-3 py-2 font-mono text-[11px] uppercase leading-tight tracking-[0.1em] text-stone-700 shadow-[3px_3px_0_0_rgba(51,42,34,0.15)]"
              >
                <p>No. 2026-0901</p>
                <p className="text-stone-500">curious / gentle / waiting</p>
              </Parallax>
            </div>
          </div>
        </section>

        {/* about / profile */}
        <section id="about" className="flex flex-col gap-14">
          <SectionHeading index="01" kicker="Profile" title="自我介紹" />

          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {profiles.map((cat, i) => (
              <div key={cat.name} className={`flex flex-col gap-5 ${cat.offset}`}>
                <Parallax
                  speed={i % 2 === 0 ? -0.2 : 0.2}
                  className="corner-ticks border border-stone-800/20 bg-[#f6f0e2] p-3 shadow-[8px_8px_0_0_rgba(51,42,34,0.1)]"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={cat.src}
                      alt={`${cat.name}，${cat.role}`}
                      fill
                      sizes="(min-width: 768px) 40vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </Parallax>

                <div className="flex items-baseline justify-between">
                  <p className="font-display text-3xl italic text-stone-900">
                    {cat.name}
                    <span className="ml-2 font-mono text-xs not-italic uppercase tracking-[0.15em] text-stone-500">
                      {cat.role}
                    </span>
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stone-500">
                    {cat.id}
                  </p>
                </div>

                <div className="flex flex-col gap-2 border-t border-stone-800/15 pt-4">
                  {cat.fields.map((f) => (
                    <Leader key={f.label} label={f.label} value={f.value} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="max-w-2xl text-sm leading-7 text-stone-600">
            小玳和小瑁是同一胎出生的親姊妹，感情非常好，能互相陪玩、減少分離焦慮，
            也很適合新手雙貓家庭，因此雙貓一起認養的家庭將優先考慮，
            如果您的環境只適合養一隻，也歡迎與我們討論，一切以貓咪的幸福為優先考量。
          </p>
        </section>

        {/* traits */}
        <section id="traits" className="flex flex-col gap-14">
          <SectionHeading index="02" kicker="Health Log" title="健康與個性" />

          <div className="flex flex-col">
            {traits.map((t, i) => (
              <div
                key={t.no}
                className={`grid grid-cols-[3.5rem_1fr] items-baseline gap-6 border-t border-stone-800/15 py-6 sm:grid-cols-[5rem_1fr] ${
                  i % 2 === 1 ? "sm:pl-10" : ""
                }`}
              >
                <span className="font-display text-4xl text-stone-300 sm:text-5xl">
                  {t.no}
                </span>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                  <p className="font-semibold text-stone-800 sm:w-48 sm:shrink-0">
                    {t.title}
                  </p>
                  <p className="text-sm leading-6 text-stone-600">{t.desc}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-stone-800/15" />
          </div>
        </section>

        {/* adoption conditions */}
        <section id="conditions" className="flex flex-col gap-14">
          <SectionHeading index="03" kicker="Checklist" title="認養須知" />

          <ul className="flex max-w-2xl flex-col gap-4">
            {conditions.map((c, i) => (
              <li key={c} className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-stone-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 -translate-y-1 border-b border-dotted border-stone-400/60" />
                <span className="max-w-md text-sm leading-6 text-stone-700">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* booking */}
        <section id="booking" className="flex flex-col gap-8">
          <SectionHeading index="04" kicker="Booking" title="預約看貓咪" />
          <p className="max-w-2xl text-sm leading-7 text-stone-600">
            留下你的 Email，讓我們可以直接跟你約時間、聊聊環境跟照顧規劃，
            安排一場跟小玳、小瑁的相見歡。
          </p>
          <BookingForm />
        </section>

        {/* contact */}
        <section id="contact" className="relative flex flex-col gap-8 border-t border-stone-800/20 pt-14">
          <Parallax
            speed={0.4}
            baseRotate={6}
            rotate={6}
            className="absolute -top-6 right-0 border border-stone-800 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-stone-700"
          >
            Open for Adoption
          </Parallax>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
            Contact
          </span>
          <h2 className="max-w-lg font-display text-4xl italic leading-tight text-stone-900 sm:text-5xl">
            我們在這裡，等你。
          </h2>
          <p className="max-w-md text-sm leading-7 text-stone-600">
            如果你已經準備好給小玳、小瑁一個家，歡迎透過以下方式與我們聯繫，
            我們會盡快回覆並安排相見歡！
          </p>
          <div className="flex flex-col gap-2 pt-2 font-mono text-sm text-stone-700">
            <Leader label="私訊" value="歡迎直接私訊" />
            <Leader
              label="Facebook"
              value={
                <a
                  href="https://www.facebook.com/peng.lan.hui.988785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted underline-offset-4 hover:text-stone-900"
                >
                  彭蘭慧（愛媽）
                </a>
              }
            />
            <Leader label="面交" value="台北市松山區" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
