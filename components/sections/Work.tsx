"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SQUASH_END } from "@/components/sections/Hero";
import { projects, type Project } from "@/lib/projects";

/**
 * Works 마퀴 — 히어로의 기하학 배경이 스크롤로 눌려 내려오면, 여기서
 * 무지개 색 조각 띠로 이어진다. 펼침은 트리거가 아니라 "스크롤 스크럽":
 * 띠가 뷰포트를 올라오는 정도에 비례해 카드(썸네일+타이틀)로 형태가 바뀌고,
 * 되돌리면 다시 선으로 접힌다. 펼침이 끝나면 오른쪽→왼쪽 자동 흐름:
 * 카드 호버 시 정지, 클릭 시 상세 이동, 좌우 화살표로 빠르게 탐색.
 * 색은 히어로 그라데이션 색면과 같은 팔레트를 순환해 통일감을 맞춘다.
 */
/* 색은 "선" 상태에서만 보인다 — 카드로 다 펼쳐지면 흰 면 + 보더로 통일되고
   컬러는 썸네일이 담당한다. 프로젝트가 늘어도 카드 색을 고를 필요가 없다. */
const palette = [
  "#ea6a20", // 오렌지
  "#db66a2", // 핑크
  "#a76fe3", // 퍼플
  "#43b9a4", // 틸
  "#c3cc3d", // 라임(accent 계열)
  "#8a2408", // 딥레드
  "#eba3b8", // 연핑크
];

const LINE_H = 32; // 접힌 무지개 선의 두께(px) — 히어로 배경이 압축돼 닿는 선과 같은 두께

function Card({ p, i, clone = false }: { p: Project; i: number; clone?: boolean }) {
  const c = palette[i % palette.length];
  return (
    <Link
      href={p.href ?? "#work"}
      data-cursor="VIEW"
      tabIndex={clone ? -1 : undefined}
      aria-hidden={clone || undefined}
      className="group relative block w-[330px] shrink-0 self-center overflow-hidden transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.08] md:w-[660px]"
      style={{
        // 높이·내용 투명도는 rAF 루프가 스크롤 진행도에 맞춰 직접 스크럽한다
        height: `${LINE_H}px`,
        background: `linear-gradient(165deg, ${c}, color-mix(in srgb, ${c} 55%, #ffffff))`,
      }}
    >
      {/* 펼침 후반에 색 위로 덮이는 흰 면 + 보더 — 내용과 같은 진행도로 페이드인 */}
      <div
        aria-hidden
        className="absolute inset-0 border border-line bg-white"
        style={{ opacity: 0 }}
      />
      <div
        className="relative flex h-full flex-col p-4 md:p-5"
        style={{ opacity: 0 }}
      >
        {/* 썸네일 영역 — thumb이 생기면 이미지, 없으면 번호 플레이스홀더 */}
        <div className="relative flex-1 overflow-hidden bg-black/[0.04]">
          {p.thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.thumb}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-semibold tracking-tight opacity-60 md:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="line-clamp-2 break-keep text-base font-semibold leading-snug tracking-tight md:text-lg">
            {p.title}
          </h3>
          <p className="mt-1 text-xs opacity-70">{p.tags[0]}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  // 렌더와 무관한 마퀴 상태는 ref 하나에 모아 rAF에서만 읽고 쓴다
  const st = useRef({
    x: 0,
    speed: 0,
    hover: false,
    arrow: 0, // -1: 왼쪽으로 빠르게(→ 버튼), +1: 오른쪽으로 빠르게(← 버튼)
    active: false,
    reduced: false,
    lastP: -1,
    lastVis: -1,
  });

  useEffect(() => {
    st.current.reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // 섹션이 화면 밖이면 rAF 루프를 쉬게 한다
    const io = new IntersectionObserver(([e]) => {
      st.current.active = e.isIntersecting;
    });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // 스크럽 + 마퀴 루프
  useEffect(() => {
    const s = st.current;
    // 랜딩에서는 히어로 배경이 선으로 착지한 뒤에야 스트립이 나타난다
    const hero = document.getElementById("top");
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const track = trackRef.current;
      const vp = viewportRef.current;
      if (!s.active || !track || !vp) return;

      // 0) 착지 전엔 스트립 숨김 — 구겨지는 배경과 이중으로 보이지 않게
      const vis =
        hero && !s.reduced
          ? Math.min(
              Math.max(
                (window.scrollY - window.innerHeight * (SQUASH_END - 0.02)) /
                  (window.innerHeight * 0.06),
                0
              ),
              1
            )
          : 1;
      if (vis !== s.lastVis) {
        s.lastVis = vis;
        vp.style.opacity = String(vis);
        vp.style.pointerEvents = vis > 0.5 ? "" : "none";
      }

      // 1) 스크롤 스크럽 — 접힌 선은 트랙 세로 중앙에 있으므로 컨테이너
      //    "중앙" 기준으로 진행도 p(0~1)를 환산한다. 히어로 배경이 선으로
      //    착지하는 시점(선 중앙이 뷰포트 82% 지점)에 시작해,
      //    40% 지점까지 올라오는 동안 카드로 펼쳐진다.
      const vh = window.innerHeight;
      const rc = vp.getBoundingClientRect();
      const lineCenter = rc.top + rc.height / 2;
      const raw = (vh * 0.82 - lineCenter) / (vh * 0.42);
      const p = s.reduced ? 1 : Math.min(Math.max(raw, 0), 1);
      if (Math.abs(p - s.lastP) > 0.0005) {
        s.lastP = p;
        const cardH =
          parseFloat(getComputedStyle(track).getPropertyValue("--card-h")) ||
          440;
        // 처음은 무조건 이어진 선 — 갭도 진행도에 따라 0에서 벌어진다
        const maxGap = window.innerWidth >= 768 ? 24 : 16;
        const gapPx = `${maxGap * (p * p * (3 - 2 * p))}px`;
        for (const copy of track.children) {
          (copy as HTMLElement).style.columnGap = gapPx;
          (copy as HTMLElement).style.paddingRight = gapPx;
        }
        const cards = track.querySelectorAll<HTMLElement>("a");
        const n = projects.length;
        const T = 0.45; // 카드 간 스태거 총량(진행도 기준)
        cards.forEach((el, k) => {
          const i = k % n;
          const pi = Math.min(
            Math.max(p * (1 + T) - (i * T) / (n - 1), 0),
            1
          );
          const e = pi * pi * (3 - 2 * pi); // smoothstep — 스크롤 구간에 고르게 분배
          el.style.height = `${LINE_H + (cardH - LINE_H) * e}px`;
          // 흰 면(보더 포함)과 내용을 같은 진행도로 페이드인 — 색은 선·펼침 중에만
          const co = String(Math.min(Math.max((pi - 0.55) / 0.45, 0), 1));
          const veil = el.firstElementChild as HTMLElement | null;
          const content = el.lastElementChild as HTMLElement | null;
          if (veil) veil.style.opacity = co;
          if (content) content.style.opacity = co;
        });
      }

      // 2) 마퀴 흐름 — 펼침이 끝난 뒤에만 흐른다
      const period = copyRef.current?.offsetWidth ?? 0;
      if (!period) return;
      const base = s.reduced || s.lastP < 1 ? 0 : 0.6;
      const target = s.arrow !== 0 ? s.arrow * 14 : s.hover ? 0 : -base;
      s.speed += (target - s.speed) * 0.08;
      s.x += s.speed;
      if (s.x <= -period) s.x += period;
      if (s.x > 0) s.x -= period;
      track.style.transform = `translate3d(${s.x}px,0,0)`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const arrowHold = (dir: number) => ({
    onPointerDown: () => {
      st.current.arrow = dir;
    },
    onPointerUp: () => {
      st.current.arrow = 0;
    },
    onPointerLeave: () => {
      st.current.arrow = 0;
    },
    onPointerCancel: () => {
      st.current.arrow = 0;
    },
    // 키보드/짧은 클릭도 한 번에 훅 밀리게
    onClick: () => {
      st.current.speed = dir * 30;
    },
  });

  const arrowCls =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/90 text-lg text-foreground shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-transform hover:scale-105";

  return (
    <section ref={sectionRef} id="work" className="pb-28 pt-6 md:pb-40 md:pt-8">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <p className="label">Works</p>
        </Reveal>
      </div>

      <div className="relative mt-6">
        <div
          ref={viewportRef}
          id="works-strip"
          /* py-5: 호버 확대분(440×0.08/2≈18px)이 overflow-hidden에 잘리지 않게 */
          className="-my-5 overflow-hidden py-5"
          onPointerEnter={() => {
            st.current.hover = true;
          }}
          onPointerLeave={() => {
            st.current.hover = false;
          }}
        >
          <div
            ref={trackRef}
            className="flex h-[220px] items-center will-change-transform [--card-h:220px] md:h-[440px] md:[--card-h:440px]"
          >
            {/* 갭은 rAF가 스크럽 — 처음(선)엔 0, 카드로 펼쳐지며 벌어진다 */}
            <div
              ref={copyRef}
              className="flex h-full items-center"
              style={{ columnGap: 0, paddingRight: 0 }}
            >
              {projects.map((p, i) => (
                <Card key={p.slug} p={p} i={i} />
              ))}
            </div>
            {/* 이어붙인 복제 — 끊김 없는 루프용 */}
            <div
              className="flex h-full items-center"
              style={{ columnGap: 0, paddingRight: 0 }}
            >
              {projects.map((p, i) => (
                <Card key={p.slug} p={p} i={i} clone />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="이전 프로젝트 보기"
          className={`${arrowCls} left-4 md:left-8`}
          {...arrowHold(1)}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="다음 프로젝트 보기"
          className={`${arrowCls} right-4 md:right-8`}
          {...arrowHold(-1)}
        >
          →
        </button>
      </div>
    </section>
  );
}
