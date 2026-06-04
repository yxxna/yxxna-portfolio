"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";

const MotionLink = motion.create(Link);

function ProjectRow({
  index,
  title,
  summary,
  tags,
  href,
}: (typeof projects)[number] & { index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // 스크롤에 따라 살짝 떠오르는 패럴랙스
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <MotionLink
      ref={ref}
      href={href ?? "#work"}
      data-cursor={href ? "VIEW" : "SOON"}
      style={{ y }}
      aria-disabled={!href}
      className="group relative grid grid-cols-12 items-baseline gap-4 border-t border-line py-10 md:py-14"
    >
      <span className="label col-span-12 md:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="col-span-12 md:col-span-11">
        <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">
          <span className="box-reveal">{title}</span>
        </h3>
        <p className="mt-3 max-w-xl text-muted">{summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="label rounded-full border border-line px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* 화살표 — 평소에도 보이고, 호버 시 왼→오로 흐른다 */}
      <span className="arrow-travel pointer-events-none absolute right-0 top-10 md:top-14">
        →
      </span>
    </MotionLink>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="label">Works</p>
        </Reveal>

        <div className="mt-16">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} index={i} {...p} />
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
