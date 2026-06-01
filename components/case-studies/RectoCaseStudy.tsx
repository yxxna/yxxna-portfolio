"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";

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
              {n} — {kicker}
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
      <p className="my-2 text-2xl font-medium leading-snug tracking-tight text-accent md:text-3xl">
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
            <span className="mt-0.5 font-mono text-accent">{s.n}</span>
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
        되돌려준다. 실사용자 0명 → <span className="text-foreground">외적 타당성 0</span>.
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
      <p className="label mb-6">Recto는 A/B 테스트의 앞뒤를 받쳐준다</p>
      <div className="space-y-2">
        {cards.map((c, i) => (
          <div key={c.t}>
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: c.on ? "var(--accent)" : "var(--line)",
                opacity: c.on ? 1 : 0.5,
              }}
            >
              <p
                className="mb-1 text-sm font-semibold"
                style={{ color: c.on ? "var(--accent)" : "var(--muted)" }}
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
  { k: "역할", v: "기획 · 제품 디자인 · 프론트엔드" },
  { k: "기간", v: "2026" },
  { k: "분야", v: "A/B 테스트 · 의사결정 도구" },
  { k: "도구", v: "Slack Bot · 픽셀 분석 · z-test" },
];

const decisions = [
  {
    t: "검증 언어를 예측 언어로 교체",
    d: "“승리 🎉 / 통계적으로 유의” → “우세 예상 / 시뮬레이션 p값 / 디자인 기반 예측이며 실제 검증 아님”. WINNER → PREDICTED, 신뢰도 → 예측 신뢰도(시뮬레이션).",
  },
  {
    t: "하드코딩된 승자 항목 삭제",
    d: "30개 요인 중 승자에게 무조건 78점을 주던 ‘전환 구조 차이’ 항목 제거. 변호할 수 없고, 발견되는 순간 신뢰가 즉사하는 코드였다.",
  },
  {
    t: "예측 면책 배너 + 실측 패널 격상",
    d: "시뮬 결과 상단에 ‘디자인 기반 예측’ 배너. 실측 데이터 패널을 ‘선택 사항’ → ‘✓ 정식 통계 검증’으로 시각적으로 끌어올림.",
  },
  {
    t: "진짜 검증의 언어는 그대로 유지",
    d: "실측 z-test(analyzeReal)의 ‘유의’ 표현은 손대지 않았다. 그건 정말로 검증이므로 정당하다.",
  },
];

export default function RectoCaseStudy() {
  return (
    <main className="flex-1 pt-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        {/* back */}
        <Link
          href="/#work"
          data-cursor="BACK"
          className="label inline-block hover:text-foreground"
        >
          ← Work
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
            Recto — 내가 만든 검증을
            <br />
            <span className="text-accent">의심한</span> 데서 시작된 도구
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-2xl text-xl text-muted"
          >
            추측으로 굴러가던 UI 의사결정을 데이터로 바꾸려다, 내 검증이
            순환논리임을 스스로 발견하고 ‘검증’이 아니라 ‘예측’ 도구로 정직하게
            재포지셔닝한 과정.
          </motion.p>
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
              남이 지적하기 전에, 내 결과물의 논리적 허점을 먼저 찾았다.
              <br />
              <span className="text-muted">
                그리고 제품이 못 하는 것을 우기지 않고 인정하자, 오히려 제품이 더
                단단해졌다.
              </span>
            </p>
          </Reveal>
        </div>

        {/* 01 문제 */}
        <Section
          n="01"
          kicker="Problem"
          title="추측으로 굴러가던 UI 의사결정"
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
          <Pull>“확신 없는 주장”들 사이에서, 기준이 될 지표가 필요했다.</Pull>
        </Section>

        {/* 02 첫 시도 */}
        <Section
          n="02"
          kicker="First Attempt"
          title="‘분석요정’, 그리고 헛발질"
          visual={
            <ImagePlaceholder hint="분석요정 슬랙봇 화면 — 이미지 2개 업로드 → 분석 결과" />
          }
        >
          <p>
            그래서 만들었어요. 처음에는 <strong>분석요정</strong>이라는 대화형
            분석 툴이었어요. 슬랙 채널에 이미지 2개를 업로드하면, 슬랙봇이 두
            이미지를 분석해 결과를 텍스트로 알려주는 형태였죠.
          </p>
          <p>
            하지만 봇은 대조군과 실험군의{" "}
            <span className="text-foreground">
              무엇을 봐야 하는지를 인식하지 못했고
            </span>
            , 결국 헛발질하는 분석만 나왔어요. 여기서 멈추지 않고, 분석 항목을 더
            섬세하게 조절하고 다양한 항목을 볼 수 있는 툴을 만들기로 결심했어요.
          </p>
          <p className="text-muted">→ 이 결심이 Recto의 출발점이 됩니다.</p>
        </Section>

        {/* 03 Recto */}
        <Section
          n="03"
          kicker="Build"
          title="예측을 구조화하다"
          visual={
            <ImagePlaceholder hint="Recto 화면 — 픽셀 분석 · 30개 요인 점수 · 시뮬레이션 결과" />
          }
        >
          <p>
            Recto는 두 디자인의 픽셀을 분석해 예측 CTR을 만들고, 그걸 기반으로
            시뮬레이션을 돌려 어느 쪽이 우세할지 보여주는 도구로 발전했어요.
            30개가 넘는 요인을 점수화하고, 통계 검정까지 붙여 “데이터 기반”의
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
          title="내 검증을 의심하다"
          visual={<CircularLogic />}
        >
          <p>
            “A/B 테스트 검증 결과가 정말 실효성이 있냐”는 의심이 들었어요. 그냥
            넘기지 않고 코드까지 내려가 점검했더니 —{" "}
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
          <Pull>이건 검증이 아니라, 난수 생성기를 검증한 것이었다.</Pull>
        </Section>

        {/* 05 결정 */}
        <Section
          n="05"
          kicker="Decision"
          title="못 하는 걸 인정하니 더 단단해졌다"
          visual={<Positioning />}
        >
          <p>
            가장 쉬운 길은 모른 척하는 거였어요. 화면은 그럴듯했고, 아무도
            코드까지 열어보진 않았으니까요. 하지만 그건 언젠가 데이터에 밝은
            사람이 첫 번째로 찌를 지점이었고, 그 순간 제품 전체의 신뢰가 무너질
            거였어요.
          </p>
          <p>
            그래서 불리하지만 정직한 결론을 택했어요.{" "}
            <span className="text-foreground">
              실제 트래픽이 없으면 그건 A/B 테스트가 아니다.
            </span>{" "}
            그렇다고 버릴 제품은 아니었어요. Recto 안에는 이미 가치 있는 두 도구가
            들어 있었거든요 — 사전 <strong>예측</strong>과 사후{" "}
            <strong>검증</strong>. 둘을 분리하고, Recto를 진짜 A/B 테스트를{" "}
            <em>대체</em>하는 게 아니라 <em>앞뒤를 받쳐주는</em> 도구로
            재포지셔닝했어요.
          </p>
          <Pull>
            제품의 간판을 우기는 대신, 한계를 인정하고 더 단단한 자리로 옮겼다.
          </Pull>
          <p>
            그 결정을 화면과 코드에 그대로 새겼어요. 특히{" "}
            <span className="text-foreground">
              승자에게 무조건 78점을 주던 하드코딩 항목
            </span>
            은, 변호할 수 없고 발견되는 순간 신뢰가 즉사하는 코드라 가장 먼저
            삭제했어요. ‘검증’이라는 단어가 정당한 곳(실측 z-test)에는 그대로
            두고, 정당하지 않은 곳(시뮬레이션)에서만 걷어냈고요.
          </p>
          <p className="label !mt-10">적용한 결정 4가지</p>
          <ol className="not-prose space-y-5">
            {decisions.map((d, i) => (
              <li key={d.t} className="flex gap-5">
                <span className="font-mono text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold">{d.t}</p>
                  <p className="mt-1 text-base text-muted">{d.d}</p>
                </div>
              </li>
            ))}
          </ol>
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
            <li className="border-l-2 border-accent pl-5">
              <span className="font-medium text-foreground">
                예측에 검증의 언어를 빌려 쓰지 않는다.
              </span>{" "}
              입력으로 만든 데이터를 같은 입력으로 검증하는 건 순환이다. ‘우세
              예상’과 ‘유의함’은 다른 단어다.
            </li>
            <li className="border-l-2 border-accent pl-5">
              <span className="font-medium text-foreground">
                한계를 인정하는 게 더 강한 포지션이다.
              </span>{" "}
              못 하는 걸 솔직히 인정하고 “앞뒤를 받쳐준다”로 재포지셔닝하자,
              오히려 데이터에 밝은 청중의 신뢰를 얻었다.
            </li>
            <li className="border-l-2 border-accent pl-5">
              <span className="font-medium text-foreground">
                가장 날카로운 검증은 스스로 거는 검증이다.
              </span>{" "}
              남이 지적하기 전에 내 결과물의 허점을 먼저 찾는 근육이, 이번에
              제품을 살렸다.
            </li>
          </ul>
          <Pull>
            “못한다”에서 멈추지 않고, 그걸 더 정확한 제품으로 바꾸는 일.
          </Pull>
          <p className="text-muted">
            다음 과제는 이 자기검증을 <span className="text-foreground">습관</span>
            으로 만드는 것 — 빠르게 만든 직후 한 번은 반드시 스스로 점검하는
            루틴으로. 약점을 의지가 아니라 구조로 메우는 방식, 그게 이번에 가장
            크게 배운 점이에요.
          </p>
        </Section>

        {/* footer nav */}
        <div className="flex items-center justify-between border-t border-line py-16">
          <Link href="/#work" data-cursor="BACK" className="label hover:text-foreground">
            ← 모든 작업
          </Link>
          <Link
            href="/#contact"
            data-cursor="MAIL"
            className="text-lg font-medium hover:text-accent"
          >
            함께 일하고 싶다면 →
          </Link>
        </div>
      </div>
    </main>
  );
}
