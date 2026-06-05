"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Nav 등에서 앵커 클릭 시 부드럽게 스크롤하도록 인스턴스를 전역 노출한다.
// (window.lenis 는 Lenis 내부가 메타데이터용으로 예약 → 별도 키 사용)
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis 기반 부드러운 스크롤. 페이지 전역에 한 번만 마운트한다.
 *
 * 주의: Lenis는 init 시점의 문서 높이로 스크롤 한계를 잡는다. 한글 웹폰트가
 * 늦게 로드되거나 라우트가 바뀌어 높이가 변하면 한계값이 어긋나 "끝까지 스크롤이
 * 안 되는" 현상이 생긴다. → 폰트 로드 후 + 라우트 변경 시 resize()로 재계산한다.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 웹폰트가 들어오며 높이가 바뀌면 한계 재계산
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => lenis.resize());
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = undefined;
    };
  }, []);

  // 라우트가 바뀌면 새 문서 높이로 한계 재계산.
  // "/#work" 처럼 해시를 달고 들어오면 맨 위 대신 해당 섹션으로 이동한다.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const hash = window.location.hash;
    const id = requestAnimationFrame(() => {
      lenis.resize();
      const target = hash ? document.querySelector(hash) : null;
      if (target) {
        lenis.scrollTo(target as HTMLElement, { immediate: true });
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
