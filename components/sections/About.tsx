"use client";

import Reveal from "@/components/Reveal";

const strengths = [
  {
    k: "1",
    t: "당연한 것을 당연하게 여기지 않습니다.",
    d: "회의실에서 다들 같은 답을 낼 때 다른 질문을 던집니다. 데이터가 정상이라 말할 때도 원인을 직접 찾아갑니다. 납득될 때까지 파고드는 것, 그게 제 시작점이에요.",
  },
  {
    k: "2",
    t: "없으면 만들어 냅니다.",
    d: "디자인할 땐 환경이 받쳐주지 못할 때가 생각보다 많더군요. 리소스 관리, 개발 환경, 내부 사정 같은 제약에도 얻고 싶은 인사이트가 있으면 할 수 있는 최선을 다했고, 없으면 직접 만들어 업무 효율을 끌어올렸어요.",
  },
  {
    k: "3",
    t: "결국 사람이 중요하다고 생각합니다.",
    d: "사람을 생각한다는 건 사용자뿐 아니라 같이 일하는 사람도 중요하다는 뜻이에요. 좋은 디자인은 혼자 나오지 않으니까요. 개발자가 구현하기 쉽도록, PM이 설득하기 쉽도록 논리를 먼저 챙겼어요. 함께 일하는 사람이 편할 때 더 좋은 결과가 나온다고 믿습니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* intro */}
        <Reveal>
          <p className="label mb-8">About</p>
          <h2 className="max-w-4xl text-3xl font-medium leading-snug tracking-tight md:text-5xl">
            문제가 보이면 질문을 던지고,
            <br />
            도구가 없으면 직접 만드는 디자이너입니다.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            다들 같은 방향을 볼 때 다른 질문을 먼저 던졌어요. A/B 환경이 없으면
            시뮬레이션 툴을 만들었고, 핸드오프가 막히면 플러그인을 만들었습니다.
            데이터가 말해주지 않는 곳에서도 기회를 찾았어요.{" "}
            <span className="text-foreground">
              제약은 저에게 멈추는 이유가 아니라, 만들기 시작하는 신호였습니다.
            </span>
          </p>
        </Reveal>

        {/* strengths */}
        <div className="mt-24 grid gap-12 md:mt-36 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <h3 className="text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                저는 몇 가지 장점을
                <br />
                가지고 있어요
              </h3>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            {strengths.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.08}>
                <div className="group border-t border-line py-8 first:border-t-0 first:pt-0 md:py-10">
                  <p className="label mb-5">{s.k}</p>
                  <h4 className="text-xl font-semibold md:text-2xl">
                    <span className="box-reveal">{s.t}</span>
                  </h4>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
