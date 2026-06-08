import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyLayout from "@/components/case-studies/CaseStudyLayout";
import { caseStudies, caseStudySlugs } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = caseStudies[slug];
  if (!data) return {};
  return {
    title: `${data.title} · Yuna Kang`,
    description: data.summary,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = caseStudies[slug];
  if (!data) notFound();
  return <CaseStudyLayout data={data} />;
}
