"use client";

import { useState } from "react";

/**
 * 헤링본 위브 패턴 — Figma "DA 2025 GUI / Desktop-2" (node 3219:2) 기반.
 * 패턴 요소는 전부 <div>.
 *
 * - 정적(기본): 틈 없이 딱 맞게 정렬된 위브. 가만히 있으면 안 움직임.
 * - 호버: 커서가 올라간 타일 + 위·아래 이웃(총 3개)만 반응.
 *   해당 타일의 그라데이션 노란색 정지점이 100% → 11% 로 무겁게 이동했다가,
 *   마우스를 떼면 원래(100%)로 되돌아온다.
 *
 * Figma 스펙: 막대 ±45° 회전, #0a6ae7(파랑) → #fcff69(노랑),
 * 컬럼 가로 피치 ≈ 222.3, 행 피치 ≈ 160.4, 홀수 컬럼 반 칸(80.2) 오프셋.
 */

// Figma "Desktop-3"(node 3220:100) 스펙. 끝점이 정확히 만나려면
// COL_PITCH = 막대길이 × cos45 = 193.901 × 0.7071 ≈ 137.1 이어야 한다(아다리).
// 길이는 Figma 그대로(끝점 정렬), 폭만 살짝 키워 긴 변의 헤어라인만 메움.
const BAR_W = 70; // Figma 66.788 + 폭 약간(긴 변 헤어라인 방지, 끝점엔 영향 X)
const BAR_H = 193.901; // 정확값 → 끝점 정렬
const COL_PITCH = 137.1;
const ROW_PITCH = 94.45;

// 넓은 화면(거터 80px 반응형)도 덮도록 넉넉히 생성 후 카드가 clip
const COLS = 18;
const ROWS = 9;
const BASE_X = -80;
const BASE_Y = -60;

export default function ChevronWeave() {
  // 커서가 올라간 타일 좌표. 이 타일과 같은 컬럼의 위·아래 이웃이 함께 반응.
  const [center, setCenter] = useState<{ c: number; r: number } | null>(null);

  const isActive = (c: number, r: number) =>
    center !== null && c === center.c && Math.abs(r - center.r) <= 1;

  const cells = [];
  for (let c = 0; c < COLS; c++) {
    const rot = c % 2 === 0 ? -45 : 45;
    const colOffsetY = (c % 2) * (ROW_PITCH / 2);
    for (let r = 0; r < ROWS; r++) {
      const x = BASE_X + c * COL_PITCH;
      const y = BASE_Y + r * ROW_PITCH + colOffsetY;
      cells.push(
        <div
          key={`${c}-${r}`}
          className={`cw-cell${isActive(c, r) ? " active" : ""}`}
          style={{
            left: x,
            top: y,
            // @ts-expect-error CSS 커스텀 프로퍼티
            "--rot": `${rot}deg`,
          }}
          onPointerEnter={() => setCenter({ c, r })}
        >
          <div className="cw-bar" />
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
/* 그라데이션 정지점(노란색 위치)을 transition 가능한 커스텀 프로퍼티로 등록 */
@property --ys {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
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
  --ys: 100%; /* 기본: 노랑 정지점 100% → 파랑→노랑 단일 그라데이션 */
  background-image: linear-gradient(to top, #0a6ae7 0%, #fcff69 var(--ys));
  /* 무게감 있는 감속 (천천히 자리잡음) */
  transition: --ys 0.95s cubic-bezier(0.16, 1, 0.3, 1);
}
.cw-cell.active .cw-bar {
  --ys: 11%; /* 호버: 노랑이 11%까지 내려와 타일이 노랗게 차오름 */
}
@media (prefers-reduced-motion: reduce) {
  .cw-bar { transition: none; }
}
`;
