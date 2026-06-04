import type { Metadata } from "next";
import Work from "@/components/sections/Work";

export const metadata: Metadata = {
  title: "Works · Yuna Kang",
};

export default function WorkPage() {
  // 고정 Nav 아래로 내려오도록 상단 여백. Work 섹션 자체 패딩도 있음.
  return (
    <main className="flex-1 pt-24 md:pt-28">
      <Work />
    </main>
  );
}
