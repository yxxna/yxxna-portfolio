import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = "http://localhost:3000/pattern";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle0" });

// 1) 정지 상태 (마우스 안 움직임)
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: "/tmp/pat-static.png" });

// 2) 특정 타일 위로 이동 → 무게감 전환 정착 대기 후 캡처
await page.mouse.move(720, 450);
await new Promise((r) => setTimeout(r, 1300));
await page.screenshot({ path: "/tmp/pat-hover.png" });

console.log("saved /tmp/pat-static.png, /tmp/pat-hover.png");
await browser.close();
