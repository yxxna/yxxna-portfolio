import type { Metadata } from "next";
import About from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About · Yuna Kang",
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-24 md:pt-28">
      <About />
    </main>
  );
}
