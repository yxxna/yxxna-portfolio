"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";

/**
 * 랜딩(허브)에서 보이는 프로젝트 대표 썸네일 그리드.
 * - 오그라드는 카피/메타 없이 썸네일만 보여 "허브" 역할만 한다.
 * - 썸네일 이미지는 나중에 추가(projects[].thumb). 없으면 플레이스홀더.
 * - 호버: 검은 박스 + 네온(accent) — 사이트의 박스리빌 모티프와 통일.
 */
export default function ProjectHub() {
  return (
    <section id="work" className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 md:pb-40">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link
              href={p.href ?? "#"}
              data-cursor={p.href ? "VIEW" : "SOON"}
              aria-disabled={!p.href}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#efeeec] transition-colors duration-500 group-hover:bg-foreground">
                {p.thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.thumb}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  // 썸네일 추가 전 플레이스홀더 — 번호 + 프로젝트명
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                    <span className="label">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-500 group-hover:text-accent">
                      {p.title}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
