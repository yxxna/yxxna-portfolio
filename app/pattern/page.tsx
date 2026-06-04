import ChevronWeave from "@/components/ChevronWeave";

/**
 * Figma "DA 2025 GUI / Desktop-5" (node 3230:368) 그대로 구현한 미리보기.
 * Desktop-3와 격자는 같고, 위브를 둥근 카드 대신 화면 끝까지 꽉 차는
 * 풀블리드 배너(라운드·거터 없음)로 바꾼 버전.
 * 전역 Nav/Cursor 위에 풀스크린 화이트 레이어로 덮어 깔끔하게 보여준다.
 * 흰 배경에서 커스텀 커서가 덮여 안 보이므로 이 페이지에선 기본 커서를 강제로 켠다.
 */
export default function PatternPreview() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-auto bg-white text-black">
      {/* 흰 배경에서 안 보이던 커서 복구 (전역 custom-cursor 무력화) */}
      <style>{`body.custom-cursor, body.custom-cursor * { cursor: default !important; }`}</style>

      {/* 풀블리드 위브 배너 — 맨 위(top:0)부터 가로 꽉, 높이는 뷰포트의 70% */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <ChevronWeave />
      </div>

      {/* 위브 바로 아래 타이틀 */}
      <footer className="flex items-center justify-between px-[80px] py-[24px]">
        <div className="flex items-baseline gap-[16px]">
          <span className="text-[48px] tracking-[-2.4px]">Portfolio</span>
          <span className="text-[16px] tracking-[-0.8px]">UX/UI Design</span>
        </div>
        <span className="text-[32px] tracking-[-1.6px]">yxxna</span>
      </footer>

      {/* 상단 네비 — 위브 위에 겹쳐 올림 */}
      <header className="absolute inset-x-0 top-0 flex items-center justify-between px-[80px] py-[16px]">
        <span className="text-[24px] tracking-[-1.2px]">yxxna.co.kr</span>
        <nav className="flex items-center gap-[29px]">
          <span className="p-[10px] text-[18px] tracking-[-0.9px]">About</span>
          <span className="p-[10px] text-[18px] tracking-[-0.9px]">Project</span>
        </nav>
      </header>
    </div>
  );
}
