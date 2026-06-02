import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = process.argv[2] || "http://localhost:3000";
const out = process.argv[3] || "/tmp/hero-shot.png";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle0" });
// 마우스를 오른쪽 중앙으로 옮겨 패럴럭스/노드 영역 활성화
await page.mouse.move(1050, 450);
await new Promise((r) => setTimeout(r, 1800)); // 모션 정착 대기
await page.screenshot({ path: out });
console.log("saved", out);
await browser.close();
