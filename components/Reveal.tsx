"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * 스크롤로 화면에 들어올 때 아래에서 올라오며 페이드인(+블러 해제).
 * globals.css의 animationIn 키프레임을 paused 상태로 걸어두고,
 * 공유 IntersectionObserver가 뷰포트 진입 시 .animate를 붙여 재생한다(1회).
 * delay로 줄줄이 등장(스태거) 연출 가능.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            sharedObserver!.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
  }
  return sharedObserver;
}

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `animate-on-scroll ${className}` : "animate-on-scroll"}
      style={{ animationDelay: `${0.1 + delay}s` }}
    >
      {children}
    </div>
  );
}
