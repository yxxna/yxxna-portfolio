import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact · Yuna Kang",
};

export default function ContactPage() {
  return (
    <main className="flex-1 pt-24 md:pt-28">
      <Contact />
    </main>
  );
}
