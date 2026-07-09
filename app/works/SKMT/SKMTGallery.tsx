"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";
import EntryBoxReveal from "@/components/EntryBoxReveal";
import { withBasePath } from "@/lib/base-path";
import { data, type GalleryImage } from "./data";

/** 세로 모바일 프로모션 이미지 한 장. 실제 이미지는 잘림 없이 전체, 없으면 점선 플레이스홀더. */
function GalleryItem({ src, alt, hint }: GalleryImage) {
  return (
    <figure className="mb-6 break-inside-avoid">
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
          style={{ aspectRatio: "9 / 19" }}
        >
          <p className="label px-6 text-center leading-relaxed">{hint}</p>
        </div>
      )}
    </figure>
  );
}

export default function SKMTGallery() {
  const { kicker, title, titleLines, summary, meta, images } = data;

  return (
    <main className="flex-1 pt-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
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

        {/* gallery — 세로 모바일 이미지를 잘림 없이 전체로, 메이슨리 컬럼 배치 */}
        <section className="border-t border-line py-16 md:py-24">
          <Reveal>
            <p className="label mb-8">Gallery · {images.length}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {images.map((img, i) => (
                <GalleryItem key={i} {...img} />
              ))}
            </div>
          </Reveal>
        </section>

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
