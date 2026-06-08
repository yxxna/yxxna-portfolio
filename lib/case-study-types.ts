/**
 * 케이스 스터디 공용 타입.
 *
 * 프로젝트 상세 페이지는 프로젝트마다 폴더 하나로 구분한다:
 *   app/works/<slug>/page.tsx   ← metadata + 렌더
 *   app/works/<slug>/data.ts    ← 그 프로젝트 콘텐츠 (CaseStudy)
 *
 * 평범한 섹션은 공용 CaseStudyLayout으로 렌더해 일관성을 유지하고,
 * 전용 다이어그램이 필요한 프로젝트(예: recto-ab)는 같은 폴더에
 * 전용 컴포넌트를 두고 직접 렌더한다.
 *
 * 섹션 = 왼쪽 텍스트(title·body·pull) + 오른쪽 이미지 자리(images).
 * 실제 이미지가 생기면 images의 hint를 보고 placeholder를 <img>로 교체하면 된다.
 */

export type CaseImage = {
  hint?: string; // 이미지가 없을 때 표시할 설명(플레이스홀더)
  src?: string; // 실제 이미지 경로 (public 기준, 예: /images/loan/shot-1.png)
  alt?: string;
  ratio?: string;
  label?: string; // "Before" / "After" 등
};

export type CaseSection = {
  n: string; // "01"
  kicker: string; // 영문 라벨
  title?: string; // 굵은 한 줄
  body?: string[]; // 문단들
  pull?: string; // 강조 인용
  images?: CaseImage[]; // 오른쪽 칸 이미지/플레이스홀더
  stat?: { value: string; label: string }; // 오른쪽 칸에 큰 숫자 강조(1개)
  stats?: { value: string; label: string; delta?: string }[]; // 풀폭 결과 그리드(여러 개)
  slide?: { src: string; alt: string; ratio?: string }; // 풀폭 슬라이드(제목 포함된 완성 이미지)
};

export type CaseStudy = {
  slug: string;
  kicker: string;
  title: string; // 메타/공유용 한 줄 제목
  titleLines?: string[]; // 헤더 표시용 줄 단위 제목(줄마다 박스 리빌 스태거). 없으면 [title].
  accentWord?: string; // (미사용) 예전 제목 강조 단어
  summary: string;
  resultLink?: { url: string; label?: string }; // 결과물(라이브·플러그인 등) 링크. 있으면 헤더에 버튼 노출, 없으면 안 보임.
  meta: { k: string; v: string }[];
  heroImage?: CaseImage;
  sections: CaseSection[];
};
