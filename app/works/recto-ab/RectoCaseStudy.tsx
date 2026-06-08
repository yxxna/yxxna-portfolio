"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";
import EntryBoxReveal from "@/components/EntryBoxReveal";

/* ── 작은 빌딩블록 ─────────────────────────────────────────── */

function Section({
  n,
  kicker,
  title,
  children,
  visual,
}: {
  n: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
  /** 오른쪽 칸에 들어갈 시각 요소. 없으면 이미지 자리(플레이스홀더)가 들어간다. */
  visual?: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        {/* 왼쪽: 텍스트만 */}
        <div>
          <Reveal>
            <p className="label mb-4">
              {n} · {kicker}
            </p>
            <h2 className="pb-1 text-3xl font-semibold leading-[1.2] tracking-tight md:text-4xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
              {children}
            </div>
          </Reveal>
        </div>

        {/* 오른쪽: 이미지/시각 요소만 */}
        <div className="md:sticky md:top-28">
          <Reveal delay={0.12}>{visual ?? <ImagePlaceholder />}</Reveal>
        </div>
      </div>
    </section>
  );
}

/** 이미지가 들어갈 자리. 나중에 실제 이미지로 교체하면 됨. */
function ImagePlaceholder({
  ratio = "4 / 3",
  label = "이미지 자리",
  hint,
}: {
  ratio?: string;
  label?: string;
  hint?: string;
}) {
  return (
    <figure>
      <div
        className="flex items-center justify-center rounded-2xl border border-dashed border-line bg-white/[0.02]"
        style={{ aspectRatio: ratio }}
      >
        <div className="px-6 text-center">
          <p className="label">{label}</p>
          {hint && <p className="mt-2 text-sm text-muted">{hint}</p>}
        </div>
      </div>
    </figure>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <p className="my-2 text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
        {children}
      </p>
    </Reveal>
  );
}

/* ── 순환논리 다이어그램 ────────────────────────────────────── */

function CircularLogic() {
  const steps = [
    { n: "①", t: "픽셀 분석 → 예측 CTR", d: "손으로 정한 가중치" },
    { n: "②", t: "그 CTR로 가짜 클릭 생성", d: "베르누이 샘플링" },
    { n: "③", t: "가짜 데이터에 z-test", d: "수학적으로는 정확" },
    { n: "④", t: "“통계적으로 유의 / 승리 🎉”", d: "사실은 난수 검증" },
  ];
  return (
    <div className="not-prose my-4 rounded-2xl border border-line p-6 md:p-8">
      <p className="label mb-6">시뮬레이션 경로 = 순환논리</p>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={s.n} className="flex items-start gap-4">
            <span className="mt-0.5 font-mono text-foreground">{s.n}</span>
            <div>
              <p className="font-medium">{s.t}</p>
              <p className="text-sm text-muted">{s.d}</p>
            </div>
            {i < steps.length - 1 && (
              <span className="ml-auto self-center text-muted">↓</span>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
        ②가 ①에서 <span className="text-foreground">내가 정한 CTR</span>을 정답으로
        삼아 샘플링하므로, 표본만 충분하면 z-test는 ①의 결론을 거의 100% “유의”하다고
        되돌려줘요. 실사용자 0명 → <span className="text-foreground">외적 타당성 0</span>.
      </p>
    </div>
  );
}

/* ── 재포지셔닝 다이어그램 ──────────────────────────────────── */

function Positioning() {
  const cards = [
    { t: "사전 · 예측", d: "픽셀 + AI + 시뮬레이션 · “우세 예상”", on: true },
    { t: "진짜 A/B 테스트", d: "실제 트래픽 (Recto 밖)", on: false },
    { t: "사후 · 검증", d: "실측 입력 → z-test ✅ · “유의함”", on: true },
  ];
  return (
    <div className="not-prose rounded-2xl border border-line p-6 md:p-8">
      <p className="label mb-6">Recto는 A/B 테스트의 앞뒤를 받쳐줘요</p>
      <div className="space-y-2">
        {cards.map((c, i) => (
          <div key={c.t}>
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: c.on ? "var(--foreground)" : "var(--line)",
                opacity: c.on ? 1 : 0.5,
              }}
            >
              <p
                className="mb-1 text-sm font-semibold"
                style={{ color: c.on ? "var(--foreground)" : "var(--muted)" }}
              >
                {c.t}
              </p>
              <p className="text-sm leading-relaxed text-muted">{c.d}</p>
            </div>
            {i < cards.length - 1 && (
              <p className="py-1 text-center text-muted">↓</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 페이지 ─────────────────────────────────────────────────── */

const meta = [
  { k: "역할", v: "기획 · 제품 디자인 · 프론트엔드 100%" },
  { k: "기간", v: "2026.05" },
  { k: "분야", v: "A/B 테스트 · 의사결정 도구" },
  { k: "도구", v: "Slack Bot · 픽셀 분석 · z-test" },
];

export default function RectoCaseStudy() {
  return (
    <main className="flex-1 pt-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* back */}
        <Link
          href="/works"
          data-cursor="BACK"
          className="label inline-block hover:text-foreground"
        >
          ← Works
        </Link>

        {/* header */}
        <header className="py-12 md:py-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="label mb-6"
          >
            Case Study · Product
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="max-w-4xl pb-2 text-4xl font-semibold leading-[1.14] tracking-tight sm:text-6xl md:text-7xl"
          >
            <EntryBoxReveal
              lines={["Recto, 내가 만든 검증을", "의심한 데서 시작된 도구"]}
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-xl text-muted"
          >
            추측으로 굴러가던 UI 의사결정을 데이터로 바꾸려다, 내 검증이
            순환논리임을 스스로 발견하고 ‘검증’이 아니라 ‘예측’ 도구로 정직하게
            재포지셔닝한 과정.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            href="https://ab-simulation-yxxnas-projects.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="↗"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            결과물 보기
            <span aria-hidden>↗</span>
          </motion.a>
        </header>

        {/* meta */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k} className="bg-background p-6">
              <p className="label mb-2">{m.k}</p>
              <p className="text-sm">{m.v}</p>
            </div>
          ))}
        </div>

        {/* TL;DR */}
        <div className="py-20 md:py-28">
          <Reveal>
            <p className="text-2xl font-medium leading-snug tracking-tight md:text-3xl">
              남이 지적하기 전에, 내 결과물의 논리적 허점을 먼저 찾았어요.
              <br />
              <span className="text-muted">
                그리고 허점을 덮는 대신 구조로 고치자, 오히려 제품이 더
                단단해졌어요.
              </span>
            </p>
          </Reveal>
        </div>

        {/* 01 배경 */}
        <Section
          n="01"
          kicker="Background"
          title="A/B 테스트를 하고 싶었어요"
          visual={
            <ImagePlaceholder
              hint="기획·디자인·개발 의견이 상충되는 상황 / 추측 기반 의사결정 다이어그램"
            />
          }
        >
          <p>
            안타깝게도 매번 UI 디자인을 개선할 때 A/B 테스트를 할 수 있는 기반이
            마련되지 않은 상태였어요. 어느 UI 요소 하나를 바꿔보려 의견을
            제시해도, 확실한 근거를 주장하는 게 아니라 추측에 의한 변경을 하게
            됐어요.
          </p>
          <p>
            이런 문제는 기획자·디자이너·개발자의 의견이 상충되면서{" "}
            <span className="text-foreground">커뮤니케이션 비용을 키웠고</span>,
            예측이 빗나가면 그대로 리소스 낭비로 이어졌어요. 아무리 회의를 해도
            결국 모두 확신 없는 주장이 됐고, 방향성을 잡아줄 지표가 필요했어요.
          </p>
          <Pull>“확신 없는 주장”들 사이에서, 기준이 될 지표가 필요했어요.</Pull>
          <p className="text-muted">→ 그래서 UI 분석 툴을 만들기로 했어요.</p>
        </Section>

        {/* 02 문제 */}
        <Section
          n="02"
          kicker="Problem"
          title="입체적인 분석 결과가 안 나왔어요"
          visual={
            <ImagePlaceholder hint="분석요정 슬랙봇 화면, 이미지 2개 업로드 → 분석 결과" />
          }
        >
          <p>
            처음에는 <strong>분석요정</strong>이라는 대화형 분석 툴을 만들었어요.
            슬랙 채널에 이미지 2개를 업로드하면, 슬랙봇이 두 이미지를 분석해
            결과를 텍스트로 알려주는 방식이었죠.
          </p>
          <p>
            하지만 봇은 대조군과 실험군의{" "}
            <span className="text-foreground">
              무엇을 봐야 하는지를 인식하지 못했고
            </span>
            , 결국 한 줄짜리 평면적인 분석만 돌려줬어요. 어떤 항목을 더 섬세하게
            조절하고, 여러 차원을 입체적으로 볼 수 있는 툴이 필요하다고 느꼈어요.
          </p>
          <p className="text-muted">→ 이 결심이 Recto의 출발점이 됩니다.</p>
        </Section>

        {/* 03 Recto */}
        <Section
          n="03"
          kicker="Build"
          title="AI와 함께 그럴듯한 시뮬레이션 툴을 만들었어요"
          visual={
            <ImagePlaceholder hint="Recto 화면, 픽셀 분석 · 30개 요인 점수 · 시뮬레이션 결과" />
          }
        >
          <p>
            Recto는 두 디자인의 픽셀을 분석해 예측 CTR을 만들고, 그걸 기반으로
            시뮬레이션을 돌려 어느 쪽이 우세할지 보여주는 도구로 발전했어요. AI와
            함께 30개가 넘는 요인을 점수화하고, 통계 검정까지 붙여 “데이터 기반”의
            톤을 갖췄죠.
          </p>
          <p>
            겉보기엔 완성도가 높았어요. z-test로 p값·신뢰구간·필요 표본 수까지
            계산해 “통계적으로 유의함”을 출력했으니까요.
          </p>
        </Section>

        {/* 04 결정적 순간 */}
        <Section
          n="04"
          kicker="Turning Point"
          title="내 검증을 의심했어요"
          visual={<CircularLogic />}
        >
          <p>
            “A/B 테스트 검증 결과가 정말 실효성이 있냐”는 의심이 들었어요. 그냥
            넘기지 않고 코드까지 내려가 점검했더니,{" "}
            <span className="text-foreground">
              시뮬레이션 경로 자체가 순환논리
            </span>
            였어요.
          </p>
          <p>
            z-test 공식 자체는 수학적으로 정확했어요. 문제는 ②단계가 ①에서{" "}
            <em>내가 손으로 정한 CTR</em>을 정답으로 두고 가짜 데이터를 만든다는
            점이었어요. 그러니 표본만 키우면 검정은 내 가정을 거의 100% “유의”하다고
            되돌려줬죠. 실사용자는 0명이고요.
          </p>
          <Pull>이건 검증이 아니라, 난수 생성기를 검증한 것이었어요.</Pull>
        </Section>

        {/* 05 해결 */}
        <Section
          n="05"
          kicker="Solution"
          title="분석 로직의 실효성을 확보했어요"
          visual={<Positioning />}
        >
          <p>
            “A/B 테스트 검증 결과가 정말 실효성이 있냐”는 의심이 들었어요. 그냥
            넘기지 않고 코드까지 내려가 점검했더니, 픽셀 분석으로 산출한 예측
            CTR을 기준으로{" "}
            <span className="text-foreground">가짜 데이터만 만들어내고</span>{" "}
            있었어요. 즉, 의미 없는 난수 생성기를 만들었던 거죠.
          </p>
          <p>
            난수 대신 <span className="text-foreground">가상 퍼널</span>을
            추가했어요. 시뮬레이션 속 임의 사용자가{" "}
            <em>유입 → 이탈 → 스크롤 도달 → 주목 → 클릭</em>의 5단계 행동 퍼널을
            거치도록 설계하고, 영역의 화면 내 위치와 픽셀 주목도(채도·밀도)가
            단계별 전환율을 좌우해 전체 클릭률이 창발하도록 했어요. 실측으로
            보증되지 않은 ‘연구’ 기반 가상 시뮬레이션임을 명시하고, 절대 수치가
            아닌 <strong>A/B 상대 비교</strong>로 정직하게 제시했습니다.
          </p>
        </Section>

        {/* 06 회고 */}
        <Section
          n="06"
          kicker="Takeaway"
          title="배운 것"
          visual={
            <ImagePlaceholder
              ratio="1 / 1"
              hint="개선 전/후 비교 · 또는 회고 키워드 이미지"
            />
          }
        >
          <p>
            이 프로젝트에서 진짜로 남은 건 도구가 아니라{" "}
            <span className="text-foreground">판단하는 방식</span>이었어요. 세
            문장으로 정리하면 이래요.
          </p>
          <ul className="not-prose space-y-4">
            <li className="border-l-2 border-foreground pl-5">
              <span className="font-medium text-foreground">
                예측에 검증의 언어를 빌려 쓰지 않아요.
              </span>{" "}
              입력으로 만든 데이터를 같은 입력으로 검증하는 건 순환이에요. ‘우세
              예상’과 ‘유의함’은 다른 단어예요.
            </li>
            <li className="border-l-2 border-foreground pl-5">
              <span className="font-medium text-foreground">
                허점은 덮는 게 아니라 구조로 고쳐요.
              </span>{" "}
              난수 생성기를 의미 있는 행동 퍼널로 바꾸자, 같은 화면도 변호할 수
              있는 예측이 됐어요. 대신 ‘연구 기반 시뮬레이션’임을 정직하게 못
              박았어요.
            </li>
            <li className="border-l-2 border-foreground pl-5">
              <span className="font-medium text-foreground">
                가장 날카로운 검증은 스스로 거는 검증이에요.
              </span>{" "}
              남이 지적하기 전에 내 결과물의 허점을 먼저 찾는 근육이, 이번에
              제품을 살렸어요.
            </li>
          </ul>
          <Pull>
            “못한다”에서 멈추지 않고, 그걸 더 정확한 제품으로 바꾸는 일.
          </Pull>
          <p className="text-muted">
            다음 과제는 이 자기검증을 <span className="text-foreground">습관</span>
            으로 만드는 것, 빠르게 만든 직후 한 번은 반드시 스스로 점검하는
            루틴으로. 약점을 의지가 아니라 구조로 메우는 방식, 그게 이번에 가장
            크게 배운 점이에요.
          </p>
        </Section>

        {/* footer nav */}
        <div className="flex items-center justify-between border-t border-line py-16">
          <Link href="/works" data-cursor="BACK" className="label hover:text-foreground">
            ← 모든 작업
          </Link>
          <Link
            href="/contact"
            data-cursor="MAIL"
            className="text-lg font-medium transition-opacity hover:opacity-60"
          >
            함께 일하고 싶다면 →
          </Link>
        </div>
      </div>
    </main>
  );
}
