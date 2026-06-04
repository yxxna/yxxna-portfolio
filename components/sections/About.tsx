"use client";

import Reveal from "@/components/Reveal";

const strengths = [
  {
    k: "01",
    t: "날카로운 자기검증",
    d: "남이 지적하기 전에 내 결과물의 논리적 허점을 먼저 찾는다.",
  },
  {
    k: "02",
    t: "정직한 판단",
    d: "듣기 좋은 결론보다 정확한 결론을 택한다. 한계를 인정해 제품을 더 단단하게 만든다.",
  },
  {
    k: "03",
    t: "약점을 시스템으로",
    d: "‘의지’가 아니라 도구와 구조로 약점을 메운다. 추진력과 아이디어가 만나는 지점.",
  },
  {
    k: "04",
    t: "실행 마감력",
    d: "점검 → 수정 → 배포 → 기록까지 한 흐름으로 끝낸다.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="label mb-6">About</p>
              <p className="text-3xl font-medium leading-snug tracking-tight md:text-4xl">
                하나의 현상을 보고
                <br />그 뒤의 의도를 읽는 것.
                <br />
                <span className="text-muted">
                  제가 디자인에서 가장 오래 붙잡는 질문입니다.
                </span>
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {strengths.map((s, i) => (
                <Reveal key={s.k} delay={i * 0.08}>
                  <div className="group h-full bg-background p-8">
                    <p className="label mb-6">{s.k}</p>
                    <h3 className="text-xl font-semibold">
                      <span className="box-reveal">{s.t}</span>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {s.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
