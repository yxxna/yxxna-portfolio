"use client";

import { useState, type CSSProperties } from "react";

/**
 * 헤링본 위브 패턴 — Figma "DA 2025 GUI / Desktop-2" (node 3219:2) 기반.
 * 패턴 요소는 전부 <div>.
 *
 * - 정적(기본): 틈 없이 딱 맞게 정렬된 위브. 가만히 있으면 안 움직임.
 * - 호버: 커서 타일을 중심으로 반경 약 5타일(HOVER_RADIUS)이 함께 반응.
 *   각 타일의 파랑 정지점이 0% → 60% 로 차올라(파랑이 더 많이 보이고 노랑은 위 끝으로 밀림),
 *   중심이 가장 강하고 바깥으로 갈수록 부드럽게 풀리는(falloff) 원형 블롭.
 *   0.8s easeOut으로 무겁게 자리잡고, 벗어나면 원래(0%)로 되돌아온다.
 *
 * Figma 스펙: 막대 ±45° 회전, #0a6ae7(파랑) → #fcff69(노랑),
 * 컬럼 가로 피치 ≈ 222.3, 행 피치 ≈ 160.4, 홀수 컬럼 반 칸(80.2) 오프셋.
 */

// Figma "Desktop-3"(node 3220:100) 스펙. 45° 회전한 막대가 "아다리"(틈·겹침 없이)
// 맞으려면 두 피치 모두 막대 치수에서 정확히 유도되어야 한다.
//  - COL_PITCH = 막대길이 × cos45  → 끝점이 옆 컬럼과 정확히 만남
//  - ROW_PITCH = 막대폭   × √2     → 한 컬럼 안에서 막대가 긴 변끼리 딱 붙음
//    (이게 안 맞으면 막대들이 3px씩 겹쳐 긴 변에 계단형 단차가 생김 = 어긋나 보임)
const BAR_W = 70; // Figma 66.788에서 약간 키운 값
const BAR_H = 193.901;
const COL_PITCH = BAR_H * Math.SQRT1_2; // ≈ 137.11
const ROW_PITCH = BAR_W * Math.SQRT2; // ≈ 98.99 (이전 94.45는 옛 폭 66.788 기준이라 어긋났음)

// 풀블리드 + 높이 70vh 라 큰 뷰포트도 덮도록 넉넉히 생성하고 컨테이너가 clip.
// COLS 22 → 가로 ≈ 3000px, ROWS 14 → 세로 ≈ 1320px 까지 커버.
const COLS = 22;
const ROWS = 14;
const BASE_X = -80;
const BASE_Y = -60;

// 호버 시 함께 반응하는 범위(타일 단위 반경). 커서 타일 기준 사방 약 5개.
const HOVER_RADIUS = 5;

export default function ChevronWeave() {
  // 커서가 올라간 타일 좌표. 이 타일을 중심으로 반경 HOVER_RADIUS 안의 타일들이 함께 반응.
  const [center, setCenter] = useState<{ c: number; r: number } | null>(null);

  // 호버 시 이 타일의 파랑 정지점(%)을 반환. 중심은 60%(파랑이 가장 많이 차오름),
  // 바깥으로 갈수록 0%(기본)로 부드럽게 풀린다. 범위 밖이면 null → 기본값.
  // 홀수 컬럼의 반 칸(0.5) 오프셋까지 반영해 자연스러운 원형 블롭.
  const barStop = (c: number, r: number): number | null => {
    if (center === null) return null;
    const dCol = c - center.c;
    const dRow = r + (c % 2) * 0.5 - (center.r + (center.c % 2) * 0.5);
    const dist = Math.sqrt(dCol * dCol + dRow * dRow);
    if (dist > HOVER_RADIUS) return null;
    const t = dist / HOVER_RADIUS; // 0(중심) → 1(가장자리)
    return 60 * (1 - t * t); // 60% → 0% (안쪽은 넓게 파랑, 가장자리만 부드럽게 풀림)
  };

  const cells = [];
  for (let c = 0; c < COLS; c++) {
    const rot = c % 2 === 0 ? -45 : 45;
    const colOffsetY = (c % 2) * (ROW_PITCH / 2);
    for (let r = 0; r < ROWS; r++) {
      const x = BASE_X + c * COL_PITCH;
      const y = BASE_Y + r * ROW_PITCH + colOffsetY;
      const stop = barStop(c, r);
      cells.push(
        <div
          key={`${c}-${r}`}
          className="cw-cell"
          style={{
            left: x,
            top: y,
            // @ts-expect-error CSS 커스텀 프로퍼티
            "--rot": `${rot}deg`,
          }}
          onPointerEnter={() => setCenter({ c, r })}
        >
          <div
            className="cw-bar"
            // 활성 타일만 인라인으로 파랑 정지점을 덮어씀(거리 기반 falloff)
            style={stop !== null ? ({ "--bs": `${stop}%` } as CSSProperties) : undefined}
          />
        </div>
      );
    }
  }

  return (
    <div className="cw-wrap" onPointerLeave={() => setCenter(null)}>
      <style>{CSS}</style>
      {cells}
    </div>
  );
}

const CSS = `
/* 파란색 정지점(= 솔리드 파랑이 차오르는 높이)을 transition 가능한 커스텀 프로퍼티로 등록.
   0% = 막대 전체가 파랑→노랑 그라데이션(기본), 60% = 아래 60%가 솔리드 파랑(노랑은 위로 밀림). */
@property --bs {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}
.cw-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #0a6ae7;
}
.cw-cell {
  position: absolute;
  width: ${BAR_W}px;
  height: ${BAR_H}px;
  transform: translate(-50%, -50%) rotate(var(--rot));
}
.cw-bar {
  width: 100%;
  height: 100%;
  --bs: 0%; /* 기본: 파랑 정지점 0% → 파랑→노랑 단일 그라데이션(현재 위브) */
  background-image: linear-gradient(to top, #0a6ae7 var(--bs), #fcff69 100%);
  /* 무게감 있는 감속 (천천히 자리잡음) */
  transition: --bs 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
/* 호버 활성 타일은 컴포넌트가 인라인으로 --bs(60~100%)를 거리 기반으로 설정 */
@media (prefers-reduced-motion: reduce) {
  .cw-bar { transition: none; }
}
`;
