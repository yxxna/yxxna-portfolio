"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";
import EntryBoxReveal from "@/components/EntryBoxReveal";
import type { CaseStudy, CaseImage } from "@/lib/case-studies";
// public 에셋의 절대경로(/images/...)에 basePath를 붙인다.
// GitHub Pages 서브경로 배포에서 일반 <img>는 basePath가 자동 적용되지 않기 때문.
import { withBasePath } from "@/lib/base-path";

/** 실제 이미지가 있으면 <img>, 없으면 점선 플레이스홀더. */
function Media({ src, alt, hint, ratio = "4 / 3", label }: CaseImage) {
  return (
    <figure className="space-y-2">
      {label && <figcaption className="label">{label}</figcaption>}
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={withBasePath(src)}
          alt={alt ?? hint ?? ""}
          loading="lazy"
          className="w-full rounded-2xl border border-line"
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-2xl border border-dashed border-line bg-white/[0.02]"
          style={{ aspectRatio: ratio }}
        >
          <p className="label px-6 text-center leading-relaxed">{hint}</p>
        </div>
      )}
    </figure>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-2 text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
      {children}
    </p>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl border border-line p-10">
      <p className="text-6xl font-semibold tracking-tight text-foreground md:text-7xl">
        {value}
      </p>
      <p className="mt-3 text-muted">{label}</p>
    </div>
  );
}

function Section({ section }: { section: CaseStudy["sections"][number] }) {
  const { n, kicker, title, body, pull, images, stat, stats, slide } = section;

  // 풀폭 결과 — 큰 숫자 그리드
  if (stats) {
    return (
      <section className="border-t border-line py-20 md:py-28">
        <Reveal>
          <p className="label mb-4">
            {n} · {kicker}
          </p>
          {title && (
            <h2 className="max-w-3xl pb-1 text-3xl font-semibold leading-[1.2] tracking-tight md:text-5xl">
              {title}
            </h2>
          )}
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="h-full bg-background p-8">
                <p className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                  {s.value}
                </p>
                {s.delta && (
                  <p className="mt-2 text-sm font-medium">{s.delta}</p>
                )}
                <p className="mt-3 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {body && (
          <Reveal delay={0.1}>
            <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-foreground/85">
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {pull && <Pull>{pull}</Pull>}
            </div>
          </Reveal>
        )}
      </section>
    );
  }

  // 풀폭 슬라이드(제목이 포함된 완성 이미지)
  if (slide) {
    return (
      <section className="border-t border-line py-16 md:py-24">
        <Reveal>
          <p className="label mb-6">
            {n} · {kicker}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath(slide.src)}
            alt={slide.alt}
            loading="lazy"
            className="w-full rounded-2xl border border-line"
          />
        </Reveal>
      </section>
    );
  }

  // 좌측 텍스트 / 우측 비주얼(통계·이미지·플레이스홀더)
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <Reveal>
            <p className="label mb-4">
              {n} · {kicker}
            </p>
            {title && (
              <h2 className="pb-1 text-3xl font-semibold leading-[1.2] tracking-tight md:text-4xl">
                {title}
              </h2>
            )}
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
              {body?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {pull && <Pull>{pull}</Pull>}
            </div>
          </Reveal>
        </div>

        <div className="md:sticky md:top-28">
          <Reveal delay={0.12}>
            {stat ? (
              <Stat {...stat} />
            ) : (
              <div className="space-y-4">
                {(images ?? [{ hint: "이미지 자리" }]).map((img, i) => (
                  <Media key={i} {...img} />
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function CaseStudyLayout({ data }: { data: CaseStudy }) {
  const { kicker, title, titleLines, summary, resultLink, meta, heroImage, sections } =
    data;

  return (
    <main className="flex-1 pt-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Link
          href="/works"
          data-cursor="BACK"
          className="label inline-block hover:text-foreground"
        >
          ← Works
        </Link>

        {/* header */}
        <header className="py-12 md:py-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="label mb-6"
          >
            {kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="max-w-4xl pb-2 text-4xl font-semibold leading-[1.14] tracking-tight sm:text-5xl md:text-6xl"
          >
            <EntryBoxReveal lines={titleLines ?? [title]} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-xl text-muted"
          >
            {summary}
          </motion.p>
          {resultLink && (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              href={resultLink.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="↗"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              {resultLink.label ?? "결과물 보기"}
              <span aria-hidden>↗</span>
            </motion.a>
          )}
        </header>

        {/* meta */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k} className="bg-background p-6">
              <p className="label mb-2">{m.k}</p>
              <p className="text-sm">{m.v}</p>
            </div>
          ))}
        </div>

        {/* hero image */}
        {heroImage && (
          <div className="py-12 md:py-16">
            <Reveal>
              <Media {...heroImage} />
            </Reveal>
          </div>
        )}

        {/* sections */}
        {sections.map((s) => (
          <Section key={s.n} section={s} />
        ))}

        {/* footer nav */}
        <div className="flex items-center justify-between border-t border-line py-16">
          <Link
            href="/works"
            data-cursor="BACK"
            className="label hover:text-foreground"
          >
            ← 모든 작업
          </Link>
          <Link
            href="/contact"
            data-cursor="MAIL"
            className="text-lg font-medium transition-opacity hover:opacity-60"
          >
            함께 일하고 싶다면 →
          </Link>
        </div>
      </div>
    </main>
  );
}
