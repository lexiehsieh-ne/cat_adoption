import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import LuckyDraw from "@/components/LuckyDraw";
import { UserNameProvider } from "@/components/UserName";
import WelcomeModal from "@/components/WelcomeModal";
import WelcomeBar from "@/components/WelcomeBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "玳瑁姊妹貓送養 | 幫小玳、小瑁找一個家",
  description: "一對3個月大、感情深厚的玳瑁貓咪姊妹誠徵一個溫暖的家，歡迎有緣人認養。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-TW"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <UserNameProvider>
          <WelcomeBar />
          {children}
          <LuckyDraw />
          <WelcomeModal />
        </UserNameProvider>
      </body>
    </html>
  );
}
