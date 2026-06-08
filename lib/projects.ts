
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
      "내 검증이 정말 실효성 있나? 시뮬레이션이 순환논리임을 스스로 발견하고, ‘검증’이 아니라 ‘예측’ 도구로 정직하게 재포지셔닝한 과정이에요.",
    tags: ["Product", "AtoZ"],
    href: "/works/recto-ab",
    accent: true,
  },
  {
    slug: "economic-weather",
    title: "경제날씨 · 직관적 경제 지표 개발 프로젝트",
    summary:
      "지수가 아니라 ‘경제 상황’을 보여주기로 했어요. 10년치 데이터로 직접 백테스팅해 검증한 산출식을, 40-50대도 1초에 읽는 날씨로 번역한 프로젝트예요.",
    tags: ["Product", "데이터", "지표 설계"],
    href: "/works/economic-weather",
  },
  {
    slug: "loan-compare",
    title: "대출비교 · 이탈 흐름 개선 프로젝트",
    summary:
      "랜딩 73.56% 이탈, ‘왜’는 데이터에 없었어요. 가설로 공백을 메워 신뢰 랜딩·부결자 리텐션·4050 친화 입력까지 다시 설계한 프로젝트예요.",
    tags: ["Product", "데이터", "가설 검증"],
    href: "/works/loan-compare",
  },
  {
    slug: "overrify",
    title: "Overrify · 인스턴스 스타일 오버라이드 탐지 피그마 플러그인 개발",
    summary:
      "지정한 스타일·배리어블이 핸드오프에서 조용히 어긋나며 개발이 막혔어요. 인스턴스 사용처와 숨은 오버라이드를 즉시 추적·복원하는 Figma 플러그인으로 병목을 없앤 과정이에요.",
    tags: ["Figma Plugin", "디자인 시스템", "핸드오프"],
    href: "/works/overrify",
  },
  {
    slug: "finance-ad-ui",
    title: "금융광고 UI 개편",
    summary:
      "viewport에 가려 안 보이고, 여백이 데드스페이스를 만들고, 누를 거리가 없어 전환이 떨어졌어요. 노출·주목·클릭을 다시 설계한 금융광고(DA) UI 개편이에요.",
    tags: ["Product", "금융"],
    href: "/works/finance-ad-ui",
  },
  {
    slug: "pass-money",
    title: "PASS 머니적립 디자인 시스템",
    summary:
      "자주 개편되는 제품이라 화면이 아니라 ‘판’이 필요했어요. Foundation부터 컴포넌트까지 디자인 시스템을 세웠고, 그 위에서 다시 설계한 개편이 CTR 개선으로 이어진 프로젝트예요.",
    tags: ["디자인 시스템", "Fintech", "Figma"],
    href: "/works/pass-money",
  },
  {
    slug: "SKMT",
    title: "SKT PASS 마케팅대행 - 프로모션 디자인",
    summary:
      "SKT PASS의 서비스를 소개하는 프로모션 이벤트 페이지의 디자인을 담당했던 프로젝트예요.",
    tags: ["프로모션 디자인", "마케팅 디자인", "Figma"],
    href: "/works/SKMT",
  },
];
