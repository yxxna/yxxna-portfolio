import type { Metadata } from "next";
import CaseStudyLayout from "@/components/case-studies/CaseStudyLayout";
import { data } from "./data";

export const metadata: Metadata = {
  title: `${data.title} · Yuna Kang`,
  description: data.summary,
};

export default function Page() {
  return <CaseStudyLayout data={data} />;
}
