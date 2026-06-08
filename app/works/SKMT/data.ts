/**
 * SKMT는 텍스트 케이스 스터디가 아니라 "프로모션 디자인 모음(이미지 갤러리)"이라
 * 공용 CaseStudyLayout 대신 같은 폴더의 SKMTGallery 컴포넌트로 렌더한다.
 *
 * 이미지 추가/순서 변경은 아래 images 배열만 손보면 된다.
 * 실제 파일은 public/images/skmt/ 에 넣고 src에 "/images/skmt/01.png" 형태로 경로를 적는다.
 * src 없이 hint만 있으면 점선 플레이스홀더로 보인다(세로 모바일 비율).
 */

export type GalleryImage = {
  src?: string; // 실제 이미지 경로 (예: "/images/skmt/01.png")
  alt?: string; // 접근성/대체 텍스트
  hint?: string; // src 없을 때 플레이스홀더에 표시할 설명
};

export type SkmtData = {
  kicker: string;
  title: string;
  titleLines?: string[];
  summary: string;
  meta: { k: string; v: string }[];
  images: GalleryImage[];
};

export const data: SkmtData = {
  kicker: "Case Study · Marketing",
  title: "SKT PASS 마케팅대행, 프로모션 디자인 모음",
  titleLines: ["SKT PASS 마케팅대행,", "프로모션 디자인 모음"],
  summary:
    "SKT PASS의 다양한 서비스를 소개하는 프로모션 이벤트 페이지의 디자인과 카피를 맡았어요. 요구사항에 맞춰 디자인한 모바일 프로모션 페이지들을 모았습니다.",
  meta: [
    { k: "역할", v: "프로모션 디자인 · 카피라이팅" },
    { k: "기간", v: "2023. 09 - 2024. 12" },
    { k: "분야", v: "마케팅 · 프로모션" },
    { k: "도구", v: "Figma" },
  ],
  // TODO: 실제 이미지를 public/images/skmt/ 에 넣고 아래에 { src, alt } 로 채우기.
  //       개수는 자유롭게 늘리면 된다.
  images: [
    { hint: "프로모션 1 (모바일 세로 전체 이미지)" },
    { hint: "프로모션 2 (모바일 세로 전체 이미지)" },
    { hint: "프로모션 3 (모바일 세로 전체 이미지)" },
    { hint: "프로모션 4 (모바일 세로 전체 이미지)" },
    { hint: "프로모션 5 (모바일 세로 전체 이미지)" },
    { hint: "프로모션 6 (모바일 세로 전체 이미지)" },
  ],
};
