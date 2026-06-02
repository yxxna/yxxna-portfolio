import ChevronWeave from "@/components/ChevronWeave";

/**
 * Figma "DA 2025 GUI / Desktop-3" (node 3220:100) 그대로 구현한 미리보기.
 * 전역 Nav/Cursor 위에 풀스크린 화이트 레이어로 덮어 깔끔하게 보여준다.
 * 흰 배경에서 커스텀 커서가 덮여 안 보이므로 이 페이지에선 기본 커서를 강제로 켠다.
 */
export default function PatternPreview() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-center overflow-auto bg-white text-black">
      {/* 흰 배경에서 안 보이던 커서 복구 (전역 custom-cursor 무력화) */}
      <style>{`body.custom-cursor, body.custom-cursor * { cursor: default !important; }`}</style>

      {/* 상단 네비 */}
      <header className="absolute inset-x-0 top-0 flex items-center justify-between px-[80px] py-[16px]">
        <span className="text-[24px] tracking-[-1.2px]">yxxna.co.kr</span>
        <nav className="flex items-center gap-[29px]">
          <span className="p-[10px] text-[18px] tracking-[-0.9px]">About</span>
          <span className="p-[10px] text-[18px] tracking-[-0.9px]">Project</span>
        </nav>
      </header>

      {/* 가운데 둥근 카드 — 양옆 80px 거터에 꽉 차는 반응형 폭 */}
      <div className="px-[80px]">
        <div className="relative h-[604px] w-full overflow-hidden rounded-[60px]">
          <ChevronWeave />
        </div>
      </div>

      {/* 하단 타이틀 */}
      <footer className="absolute inset-x-0 bottom-0 flex items-center justify-between px-[80px] py-[24px]">
        <div className="flex items-baseline gap-[16px]">
          <span className="text-[48px] tracking-[-2.4px]">Portfolio</span>
          <span className="text-[16px] tracking-[-0.8px]">UX/UI Design</span>
        </div>
        <span className="text-[32px] tracking-[-1.6px]">yxxna</span>
      </footer>
    </div>
  );
}
