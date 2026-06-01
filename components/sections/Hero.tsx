"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

// 3D 캔버스는 클라이언트에서만 로드 (SSR 비활성화)
const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

const line = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: 0.2 + i * 0.12 },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 3D 배경 */}
      <div className="absolute inset-0 -z-10">
        <Hero3D />
      </div>
      {/* 가독성용 그라데이션 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/70 to-transparent" />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <p className="label mb-6">Product Designer · Seoul</p>
        <h1 className="max-w-4xl pb-2 text-5xl font-semibold leading-[1.12] tracking-tight sm:text-7xl md:text-8xl">
          {["보이는 결과 너머의", "의도를 설계합니다."].map((t, i) => (
            <motion.span
              key={t}
              custom={i}
              variants={line}
              initial="hidden"
              animate="show"
              className="block"
            >
              {t}
            </motion.span>
          ))}
        </h1>
        <motion.p
          custom={2}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-xl text-lg text-muted"
        >
          현상에서 더 깊은 의도를 읽고, 날카롭게 판단하는 프로덕트 디자이너
          강유나입니다.
        </motion.p>

        <motion.a
          custom={3}
          variants={line}
          initial="hidden"
          animate="show"
          href="#work"
          data-cursor="VIEW"
          className="mt-12 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium"
        >
          작업 보기 ↓
        </motion.a>
      </div>

      <div className="label absolute bottom-8 right-6 hidden md:block md:right-10">
        Scroll
      </div>
    </section>
  );
}
