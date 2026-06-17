// أداة لقطات داخلية — تتأكد من النتيجة بصريًا (لا تُشحن للإنتاج).
// الاستخدام: node scripts/shot.mjs <url> <out-prefix> [scrollY]
import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000/";
const prefix = process.argv[3] || "shot";
const scrollY = Number(process.argv[4] || 0);

const browser = await chromium.launch();

async function snap(name, width, height) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(600);
  if (scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(400);
  }
  // قياس عرض المستند مقابل العرض المرئي لكشف الـ overflow الأفقي
  const m = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  console.log(`${name} ${width}x${height} → scrollW=${m.scrollW} clientW=${m.clientW} overflowX=${m.scrollW > m.clientW}`);
  await page.screenshot({ path: `D:/work/carpet-E-commerce/.shots/${prefix}-${name}.png`, fullPage: false });
  await ctx.close();
}

await snap("mobile", 390, 844);
await snap("desktop", 1366, 900);
await browser.close();
console.log("done");
