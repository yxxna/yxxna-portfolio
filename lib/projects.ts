/**
 * 케이스 스터디 데이터. 여기만 채우면 Work 섹션이 자동으로 그려진다.
 * 첫 카드(Recto)는 weekly-report의 "순환논리 발견 → 정직한 재포지셔닝" 서사를
 * 그대로 케이스 스터디로 옮길 자리.
 */
export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  href?: string; // 상세 페이지가 있으면 연결, 없으면 비활성
  accent?: boolean;
  thumb?: string; // 대표 썸네일 경로(나중에 추가). 없으면 랜딩 허브에서 플레이스홀더 표시.
};

export const projects: Project[] = [
  {
    slug: "recto-ab",
    title: "Recto · A/B 예측 도구",
    summary:
      "내 검증이 정말 실효성 있나? 시뮬레이션이 순환논리임을 스스로 발견하고, ‘검증’이 아니라 ‘예측’ 도구로 정직하게 재포지셔닝한 과정.",
    tags: ["Product", "AtoZ"],
    href: "/works/recto-ab",
    accent: true,
  },
  {
    slug: "economic-weather",
    title: "경제날씨 · 직관적 경제 지표",
    summary:
      "지수가 아니라 ‘경제 상황’을 보여주기로. 10년치 데이터로 직접 백테스팅해 검증한 산출식을, 40-50대도 1초에 읽는 날씨로 번역한 프로젝트.",
    tags: ["Product", "데이터", "지표 설계"],
    href: "/works/economic-weather",
  },
  {
    slug: "loan-compare",
    title: "대출비교 · 이탈 흐름 개선",
    summary:
      "랜딩 53.7% 이탈, ‘왜’는 데이터에 없었다. 가설로 공백을 메워 신뢰 랜딩·부결자 리텐션·4050 친화 입력까지 다시 설계한 프로젝트.",
    tags: ["Product", "데이터", "가설 검증"],
    href: "/works/loan-compare",
  },
  {
    slug: "overrify",
    title: "Overrify · 핸드오프 병목 제거 플러그인",
    summary:
      "지정한 스타일·배리어블이 핸드오프에서 조용히 어긋나며 개발이 막혔다. 인스턴스 사용처와 숨은 오버라이드를 즉시 추적·복원하는 Figma 플러그인으로 병목을 없앤 과정.",
    tags: ["Figma Plugin", "디자인 시스템", "핸드오프"],
    href: "/works/overrify",
  },
  // ── 껍데기(준비 중) — 내용은 나중에. href 없으면 리스트에서 "SOON"으로 비활성. ──
  {
    slug: "finance-ad-ui",
    title: "금융광고 UI 개편",
    summary: "케이스 스터디 준비 중이에요.",
    tags: ["Product", "금융"],
  },
  {
    slug: "pass-money",
    title: "PASS머니적립 출시",
    summary: "케이스 스터디 준비 중이에요.",
    tags: ["Product", "Fintech"],
  },
];
