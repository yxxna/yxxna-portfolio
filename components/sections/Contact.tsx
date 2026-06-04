"use client";

import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="label mb-6">Contact</p>
          <a
            href="mailto:yxxna.design@gmail.com"
            data-cursor="MAIL"
            className="block max-w-5xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="box-reveal">
              함께 만들 이야기가 있다면,
              <br />
              언제든 메일 주세요.
            </span>
          </a>

          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4">
            <a
              href="mailto:yxxna.design@gmail.com"
              className="text-lg underline-offset-4 hover:underline"
            >
              yxxna.design@gmail.com
            </a>
            <a
              href="#" // TODO: Tistory 블로그 URL
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="↗"
              className="label hover:text-foreground"
            >
              Tistory
            </a>
            <a
              href="#" // TODO: LinkedIn 프로필 URL
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="↗"
              className="label hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>

        <p className="label mt-24">
          © {new Date().getFullYear()} Yuna Kang — Designed & built in Seoul
        </p>
      </div>
    </section>
  );
}
