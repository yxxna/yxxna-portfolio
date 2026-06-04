"use client";

import { useEffect, useState } from "react";

/**
 * 최초 진입 시 한 번 재생되는 박스 리빌 (호버 아님).
 * .box-reveal 유틸을 그대로 쓰되, 마운트 직후 --on 을 켜서 검은 직사각형이
 * 왼→오로 차오르며 텍스트가 네온으로 전환된다. 상세(케이스 스터디) 통 타이틀용.
 *
 * 여러 줄이면 줄마다 별도의 박스를 만들고, 줄 사이에 stagger(기본 0.3s) 딜레이를
 * 둬서 위→아래로 순차 재생한다. (한 줄 타이틀에 박스 하나만 있으면 어색하지 않게)
 */
function RevealLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span className="block">
      <span className={`box-reveal${on ? " box-reveal--on" : ""}`}>
        {children}
      </span>
    </span>
  );
}

export default function EntryBoxReveal({
  lines,
  startDelay = 450,
  stagger = 300,
}: {
  /** 줄 단위 콘텐츠. 각 줄이 자기만의 박스를 갖는다. */
  lines: React.ReactNode[];
  /** 첫 줄이 재생되기까지의 지연(ms) */
  startDelay?: number;
  /** 줄 사이 지연(ms) */
  stagger?: number;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <RevealLine key={i} delay={startDelay + i * stagger}>
          {line}
        </RevealLine>
      ))}
    </>
  );
}
