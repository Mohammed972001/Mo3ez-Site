// لقطة لعنصر محدّد (selector) بدقة عالية لفحص التفاصيل.
// node scripts/shot-el.mjs <url> <selector> <out> <width>
import { chromium } from "playwright";
const [url, selector, out, width] = [
  process.argv[2] || "http://localhost:3000/",
  process.argv[3] || "body",
  process.argv[4] || "el",
  Number(process.argv[5] || 1366),
];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(2200);
const el = page.locator(selector).first();
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await el.screenshot({ path: `D:/work/carpet-E-commerce/.shots/${out}.png` });
await browser.close();
console.log("shot:", out, selector);
