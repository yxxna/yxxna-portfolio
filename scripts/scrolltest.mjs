import puppeteer from "puppeteer-core";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = process.argv[2] || "http://localhost:3000/work/economic-weather";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto(url, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500)); // 폰트/모션 정착 대기

const m = await page.evaluate(() => {
  const de = document.documentElement;
  return {
    viewport: window.innerHeight,
    documentScrollHeight: de.scrollHeight,
    bodyScrollHeight: document.body.scrollHeight,
    maxScrollTop: de.scrollHeight - window.innerHeight,
    htmlOverflow: getComputedStyle(de).overflow,
    bodyOverflow: getComputedStyle(document.body).overflow,
    bodyHeight: getComputedStyle(document.body).height,
    htmlHeight: getComputedStyle(de).height,
  };
});

// 맨 아래까지 스크롤 시도 (네이티브)
await page.evaluate(() => window.scrollTo(0, 9_000_000));
await new Promise((r) => setTimeout(r, 400));
const reached = await page.evaluate(() => ({
  scrollY: window.scrollY,
  atBottom:
    Math.abs(
      window.scrollY + window.innerHeight - document.documentElement.scrollHeight
    ) < 4,
}));

console.log(JSON.stringify({ url, ...m, reached }, null, 2));

// 마지막 섹션/푸터가 실제로 보이는지
const footerVisible = await page.evaluate(() => {
  const links = [...document.querySelectorAll("a")].filter((a) =>
    a.textContent?.includes("모든 작업")
  );
  if (!links.length) return "footer link not found";
  const r = links[0].getBoundingClientRect();
  return { top: Math.round(r.top), inViewport: r.top < window.innerHeight };
});
console.log("footer:", JSON.stringify(footerVisible));

await browser.close();
