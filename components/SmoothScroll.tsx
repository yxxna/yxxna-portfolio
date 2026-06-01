"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

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
    };
  }, []);

  // 라우트가 바뀌면 맨 위로 + 새 문서 높이로 한계 재계산
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    // 레이아웃이 그려진 다음 프레임에 재계산
    const id = requestAnimationFrame(() => lenis.resize());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
