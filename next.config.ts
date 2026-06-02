import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/base-path";

// GitHub Pages 프로젝트 페이지는 https://<user>.github.io/<repo>/ 하위로 서빙되므로
// 프로덕션 빌드에서만 basePath를 붙인다(BASE_PATH가 NODE_ENV로 분기).
const nextConfig: NextConfig = {
  output: "export", // 정적 HTML/CSS/JS로 내보내기 (GitHub Pages용)
  basePath: BASE_PATH,
  images: { unoptimized: true }, // 정적 export에서는 기본 이미지 최적화 사용 불가
  trailingSlash: true, // /work/recto-ab/ → index.html 형태로 안정적으로 서빙
};

export default nextConfig;
