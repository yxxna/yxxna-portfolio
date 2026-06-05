import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

// 랜딩은 단일 스크롤 페이지 — Hero → Works → About → Contact.
// 상단 Nav는 각 섹션(#work/#about/#contact) 앵커로 스크롤만 이동한다.
// (개별 페이지 /works·/about·/contact 라우트는 그대로 두어 직접 URL 접근/케이스스터디 연동에 사용)
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Work />
      <About />
      <Contact />
    </main>
  );
}
