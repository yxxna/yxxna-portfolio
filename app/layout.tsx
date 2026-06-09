import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuna Kang · Product Designer",
  description:
    "현상에서 더 깊은 의도를 읽고, 날카롭게 판단하는 프로덕트 디자이너 강유나의 포트폴리오.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistMono.variable} antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="custom-cursor min-h-screen flex flex-col">
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
