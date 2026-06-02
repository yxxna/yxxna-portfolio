import puppeteer from "puppeteer-core";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
for (const [w, h, name] of [[1440, 820, "1440"], [1100, 720, "1100"]]) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1.5 });
  await page.goto("http://localhost:3000/pattern", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: `/tmp/resp-${name}.png` });
}
console.log("saved /tmp/resp-1440.png /tmp/resp-1100.png");
await browser.close();
