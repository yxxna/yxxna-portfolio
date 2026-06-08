import type { Metadata } from "next";
import SKMTGallery from "./SKMTGallery";
import { data } from "./data";

export const metadata: Metadata = {
  title: `${data.title} · Yuna Kang`,
  description: data.summary,
};

export default function Page() {
  return <SKMTGallery />;
}
