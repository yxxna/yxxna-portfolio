"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * 스크롤로 화면에 들어올 때 아래에서 올라오며 페이드인.
 * delay로 줄줄이 등장(스태거) 연출 가능.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
