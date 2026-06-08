import type { Metadata } from "next";
import RectoCaseStudy from "./RectoCaseStudy";

export const metadata: Metadata = {
  title: "Recto · A/B 예측 도구 · Yuna Kang",
  description:
    "추측으로 굴러가던 UI 의사결정을 데이터로 바꾸려다, 내 검증이 순환논리임을 스스로 발견하고 ‘검증’이 아니라 ‘예측’ 도구로 정직하게 재포지셔닝한 과정.",
};

export default function Page() {
  return <RectoCaseStudy />;
}
