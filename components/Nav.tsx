"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

// 랜딩의 각 섹션으로 가는 앵커. 라우트 이동 없이 스크롤만 한다.
const links = [
  { label: "Works", hash: "#work" },
  { label: "About", hash: "#about" },
  { label: "Contact", hash: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 홈에 있으면 라우트 이동 없이 Lenis로 부드럽게 스크롤.
  // 다른 페이지(케이스스터디 등)면 Link가 "/#hash"로 이동 → 홈 도착 후 SmoothScroll이 해당 섹션으로.
  const onAnchor = (e: React.MouseEvent, target: string) => {
    if (isHome) {
      e.preventDefault();
      window.__lenis?.scrollTo(target);
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(250,250,250,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/#top"
          onClick={(e) => onAnchor(e, "#top")}
          className="text-sm font-semibold tracking-tight"
        >
          Yuna&nbsp;Kang
          <span className="text-foreground">.</span>
        </Link>
        <ul className="flex items-center gap-7">
          {links.map((l) => (
            <li key={l.hash}>
              <Link
                href={`/${l.hash}`}
                onClick={(e) => onAnchor(e, l.hash)}
                className="label relative transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
