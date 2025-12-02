import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { memoRepository, summaryRepository, tagRepository } from "@/lib/repositories";
import { StoreInitializer } from "./StoreInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mimo - マイクロメモ",
  description: "手軽に記録できる、自動分類機能付きメモアプリ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialMemos = await memoRepository.getAll();
  const initialSummaries = await summaryRepository.getSummaries();
  const initialEntries = [...initialMemos, ...initialSummaries];
  const initialTags = await tagRepository.getAll();

  return (
    <html lang="ja">
      <StoreInitializer entries={initialEntries} tags={initialTags} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
