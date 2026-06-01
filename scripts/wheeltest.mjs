import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });

// 실제 사용자 흐름 재현: 홈 → Work 링크 클릭(클라이언트 네비) → 휠 스크롤
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 800));
await page.evaluate(() => {
  const a = [...document.querySelectorAll("a")].find((x) =>
    x.getAttribute("href") === "/work/economic-weather"
  );
  a?.click();
});
await new Promise((r) => setTimeout(r, 1500));

const url = await page.evaluate(() => location.pathname);

// 휠로 끝까지 내려보기 (Lenis가 가로채는 경로)
await page.mouse.move(640, 450);
for (let i = 0; i < 60; i++) {
  await page.mouse.wheel({ deltaY: 600 });
  await new Promise((r) => setTimeout(r, 60));
}
await new Promise((r) => setTimeout(r, 1200));

const res = await page.evaluate(() => {
  const de = document.documentElement;
  const max = de.scrollHeight - window.innerHeight;
  return {
    scrollY: Math.round(window.scrollY),
    maxScrollTop: Math.round(max),
    gap: Math.round(max - window.scrollY),
    reachedBottom: max - window.scrollY < 8,
  };
});
console.log("after client-nav + wheel:", JSON.stringify({ url, ...res }, null, 2));

await browser.close();
