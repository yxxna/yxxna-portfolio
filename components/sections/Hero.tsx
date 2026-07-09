"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const line = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: 0.2 + i * 0.12 },
  }),
};

/* 문장 속 스킬 알약 칩 — 흰 배경 + 컬러 아이콘 + 볼드 텍스트 (photon.codes 레퍼런스) */
function Chip({
  icon,
  color,
  children,
}: {
  icon: ReactNode;
  color: string;
  children: ReactNode;
}) {
  return (
    <span className="mx-[0.28em] inline-flex items-center gap-[0.35em] rounded-full bg-white px-[0.6em] py-[0.22em] align-middle text-[0.78em] shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
      <span style={{ color }} className="inline-flex">
        {icon}
      </span>
      <span className="font-bold text-[#111114]">{children}</span>
    </span>
  );
}

const iconProps = {
  width: "0.8em",
  height: "0.8em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const CursorIcon = (
  <svg {...iconProps}>
    <path d="M5.5 4.5l6 14.5 2.2-6.3 6.3-2.2-14.5-6z" />
  </svg>
);
const TerminalIcon = (
  <svg {...iconProps}>
    <path d="M5.5 7.5l4.5 4.5-4.5 4.5" />
    <path d="M13.5 18.5H19" />
  </svg>
);
const ChartIcon = (
  <svg {...iconProps}>
    <path d="M6 19.5v-4" />
    <path d="M12 19.5v-9" />
    <path d="M18 19.5v-14" />
  </svg>
);

/* 기하학적 그라데이션 배경 — 전부 정적 CSS 색면(필터·상시 애니메이션 없음).
   스크롤 전반부에 아래로 이동하며(translateY) 눌려서(scaleY) 높이 32px의
   무지개 선이 되어 Works 섹션의 접힌 선 위치에 정확히 착지한다.
   착지 후엔 카드가 펼쳐지는 동안 뒤에서 페이드아웃. */
const LINE_H = 32;
// 스크롤이 0.5vh 진행되면 선 완성 — Works 스트립이 이 시점에 배턴을 받는다
export const SQUASH_END = 0.5;
const FADE_LEN = 0.2; // 착지 후 0.2vh 동안 페이드아웃

function GradientField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const pr = Math.min(Math.max(y / (vh * SQUASH_END), 0), 1);
      // 착지 지점: Works 접힌 선의 문서상 위치 (히어로 하단 → 선 하단까지의 거리)
      const sec = el.parentElement!;
      const strip = document.getElementById("works-strip");
      let tyMax = 0;
      if (strip) {
        const sr = strip.getBoundingClientRect();
        const secBottomDoc = sec.getBoundingClientRect().bottom + y;
        tyMax = sr.top + y + sr.height / 2 + LINE_H / 2 - secBottomDoc;
      }
      const target = LINE_H / el.offsetHeight;
      el.style.transform = `translateY(${tyMax * pr}px) scaleY(${
        1 - (1 - target) * pr
      })`;
      // 착지 후 카드가 펼쳐지는 동안 사라진다
      const fade = Math.min(
        Math.max((y - vh * SQUASH_END) / (vh * FADE_LEN), 0),
        1
      );
      el.style.opacity = String(1 - fade);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 origin-bottom overflow-hidden will-change-transform"
    >
      {/* 베이스: 중앙 핑크 */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ec84ac,#db66a2)]" />
      {/* 좌측 딥레드 → 오렌지 밴드 */}
      <div className="absolute inset-y-0 left-0 w-[13%] bg-[linear-gradient(180deg,#8a2408,#d4531a_55%,#e0662a)]" />
      {/* 좌중 오렌지 필드 — 오른쪽 가장자리는 핑크로 자연스럽게 소멸 */}
      <div className="absolute inset-y-0 left-[13%] w-[34%] bg-[linear-gradient(100deg,#ea6a20,#ee9550_55%,transparent)]" />
      {/* 우측 퍼플 밴드 */}
      <div className="absolute inset-y-0 left-[64%] w-[24%] bg-[linear-gradient(180deg,#b085e8,#a76fe3)]" />
      {/* 맨 우측 연핑크 밴드 */}
      <div className="absolute inset-y-0 right-0 w-[12%] bg-[linear-gradient(180deg,#eba3b8,#d98fb3)]" />
      {/* 좌하단 골드+라임(브랜드 accent 섞음) */}
      <div className="absolute bottom-0 left-0 h-[40%] w-[42%] bg-[linear-gradient(25deg,color-mix(in_srgb,var(--accent)_40%,#d9a83f),transparent_75%)]" />
      {/* 우하단 틸 */}
      <div className="absolute bottom-0 left-[55%] right-0 h-[45%] bg-[linear-gradient(180deg,transparent,#43b9a4_35%,#5fd3bd)]" />
      {/* 중앙 거대 라운드 실루엣 — 밝은 오버레이로 곡선 경계만 드러남 */}
      <div className="absolute left-1/2 top-[8%] aspect-square w-[150vmin] -translate-x-1/2 rounded-[38%] bg-white/10" />
      {/* 상단 살짝 어둡게 눌러 텍스트·Nav 대비 확보 */}
      <div className="absolute inset-x-0 top-0 h-[30%] bg-[linear-gradient(180deg,rgba(0,0,0,0.14),transparent)]" />
    </div>
  );
}

export default function Hero() {
  // 배경이 선으로 내려가는 동안 흰 텍스트가 흰 바닥에 남지 않도록
  // 콘텐츠도 스크롤에 맞춰 페이드아웃한다.
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const op = String(
        1 -
          Math.min(
            Math.max(window.scrollY / (window.innerHeight * 0.35), 0),
            1
          )
      );
      if (contentRef.current) contentRef.current.style.opacity = op;
      if (hintRef.current) hintRef.current.style.opacity = op;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative flex min-h-screen items-center">
      <GradientField />

      <div
        ref={contentRef}
        className="mx-auto w-full max-w-[1600px] px-6 text-center md:px-10"
      >
        <motion.p
          custom={0}
          variants={line}
          initial="hidden"
          animate="show"
          className="label mb-8 !text-white/80"
        >
          Product Designer · Seoul
        </motion.p>

        <motion.h1
          custom={1}
          variants={line}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-[1150px] break-keep pb-2 text-4xl font-semibold leading-[1.45] tracking-tight text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.18)] sm:text-5xl md:text-6xl"
        >
          보이는 결과 너머의 의도를{" "}
          <Chip icon={CursorIcon} color="#ff5c39">
            UX/UI
          </Chip>{" "}
          <Chip icon={TerminalIcon} color="#18b9dd">
            Vibe Coding
          </Chip>{" "}
          그리고{" "}
          <Chip icon={ChartIcon} color="#8b5cf6">
            데이터
          </Chip>
          로 설계합니다.
        </motion.h1>

        <motion.p
          custom={2}
          variants={line}
          initial="hidden"
          animate="show"
          className="mx-auto mt-8 max-w-xl text-lg text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.2)]"
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
          className="mt-12 inline-flex items-center gap-2 border-b border-white pb-1 text-sm font-medium text-white"
        >
          작업 보기 ↓
        </motion.a>
      </div>

      <div
        ref={hintRef}
        className="label absolute bottom-8 right-6 hidden !text-white/80 md:block md:right-10"
      >
        Scroll
      </div>
    </section>
  );
}
