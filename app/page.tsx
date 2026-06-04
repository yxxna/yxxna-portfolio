import Hero from "@/components/sections/Hero";
import ProjectHub from "@/components/sections/ProjectHub";

// 랜딩은 허브 역할만 — Hero + 프로젝트 대표 썸네일.
// Works / About / Contact 는 각각 /works, /about, /contact 개별 페이지.
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ProjectHub />
    </main>
  );
}
