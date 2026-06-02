"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * Edison(edisonscientific.com) 스타일의 궤도형 별자리 다이어그램.
 * - 점선 동심원이 천천히 회전
 * - 중심에서 각 노드로 가는 가는 연결선
 * - 노드(역량 키워드)는 모노 라벨과 함께 고정 배치
 * - 마우스에 반응하는 미세한 패럴럭스 + hover 하이라이트
 *
 * 다크 + 라임(--accent) 테마에 맞춰 변환했다. blob 대신 Hero 배경으로 사용.
 */

const CENTER = 500;
const RINGS = [180, 300, 430];

// 노드: 화면 각도(도)와 궤도 반지름. 키워드만 바꾸면 내용이 바뀐다.
const NODES = [
  { label: "UX STRATEGY", angle: -18, r: 300 },
  { label: "INTERACTION DESIGN", angle: 28, r: 430 },
  { label: "DESIGN SYSTEMS", angle: 72, r: 300 },
  { label: "PROTOTYPING", angle: 118, r: 430 },
  { label: "USER RESEARCH", angle: 162, r: 300 },
  { label: "DATA-INFORMED", angle: 206, r: 430 },
  { label: "VISUAL DESIGN", angle: 252, r: 300 },
  { label: "SERVICE DESIGN", angle: 305, r: 430 },
] as const;

// SVG 그룹을 viewBox 중심(500,500) 기준으로 회전시키기 위한 공통 스타일
const SPIN_ORIGIN = {
  transformOrigin: `${CENTER}px ${CENTER}px`,
  transformBox: "view-box" as const,
};

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(a), y: CENTER + r * Math.sin(a) };
}

export default function Orbit() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 마우스 패럴럭스 — 포인터를 -1..1로 정규화 → 스프링 → 픽셀 변위
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const moveX = useTransform(sx, (v) => v * 22);
  const moveY = useTransform(sy, (v) => v * 22);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      {/* 패럴럭스 레이어: 마우스 따라 살짝 이동 */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[4vw]"
        style={{ x: moveX, y: moveY }}
      >
        <svg
          viewBox="0 0 1000 1000"
          className="h-[120vmin] w-[120vmin] max-w-none"
          aria-hidden
        >
          {/* 회전하는 점선 동심원들 */}
          <motion.g
            style={SPIN_ORIGIN}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 140, ease: "linear", repeat: Infinity }}
          >
            {RINGS.map((r, i) => (
              <circle
                key={r}
                cx={CENTER}
                cy={CENTER}
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth={1}
                strokeDasharray={i % 2 === 0 ? "2 8" : "2 12"}
              />
            ))}
          </motion.g>

          {/* 반대로 도는 얇은 보조 링 (깊이감) */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={365}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
            strokeDasharray="1 14"
            style={SPIN_ORIGIN}
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 200, ease: "linear", repeat: Infinity }}
          />

          {/* 연결선 + 노드 + 라벨 */}
          {NODES.map((node, i) => {
            const { x, y } = polar(node.angle, node.r);
            const isActive = hovered === i;
            const rightHalf = Math.cos((node.angle * Math.PI) / 180) >= 0;
            const labelX = rightHalf ? x + 16 : x - 16;

            return (
              <g
                key={node.label}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* 연결선: 마운트 시 그려지듯 등장 */}
                <motion.line
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  stroke={isActive ? "var(--accent)" : "rgba(255,255,255,0.16)"}
                  strokeWidth={isActive ? 1.4 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                />

                {/* 노드 마커 (작은 사각형) */}
                <motion.rect
                  x={x - 5}
                  y={y - 5}
                  width={10}
                  height={10}
                  fill={isActive ? "var(--accent)" : "var(--background)"}
                  stroke={isActive ? "var(--accent)" : "rgba(255,255,255,0.5)"}
                  strokeWidth={1.2}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: "backOut" }}
                  style={{ transformOrigin: `${x}px ${y}px`, transformBox: "view-box" }}
                />

                {/* hover 시 노드 주변 펄스 링 */}
                {isActive && !reduce && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={1}
                    initial={{ r: 8, opacity: 0.8 }}
                    animate={{ r: 22, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}

                {/* 라벨 (모노 대문자) */}
                <motion.text
                  x={labelX}
                  y={y + 4}
                  textAnchor={rightHalf ? "start" : "end"}
                  fill={isActive ? "var(--foreground)" : "var(--muted)"}
                  style={{
                    fontFamily: "var(--font-mono), ui-monospace, monospace",
                    fontSize: 14,
                    letterSpacing: "0.08em",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.08 }}
                >
                  {node.label}
                </motion.text>
              </g>
            );
          })}

          {/* 중심 코어 + 펄스 */}
          <circle cx={CENTER} cy={CENTER} r={4} fill="var(--accent)" />
          {!reduce && (
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={1}
              initial={{ r: 6, opacity: 0.9 }}
              animate={{ r: 26, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </svg>
      </motion.div>
    </div>
  );
}
