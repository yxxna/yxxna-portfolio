// GitHub Pages 프로젝트 페이지(https://<user>.github.io/<repo>/) 하위 경로.
// 빌드 시 NEXT_PUBLIC_BASE_PATH 환경변수로 주입한다(워크플로에서 설정).
// 로컬 dev에서는 비어 있어 루트("")로 동작한다.
// NEXT_PUBLIC_ 접두 환경변수는 next가 클라이언트 번들에 확실히 인라인한다.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** public 절대경로(/images/...)에 basePath를 붙인다. 외부 URL은 그대로 둔다. */
export const withBasePath = (path: string) =>
  path.startsWith("/") ? `${BASE_PATH}${path}` : path;
