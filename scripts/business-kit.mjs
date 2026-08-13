/**
 * business-kit.mjs — prints the canonical listing kit (spec 003, T001).
 *
 * Every external listing (business profile, map platforms, directories) must
 * be created from THESE exact values. Copy-paste them; never retype from
 * memory — a single NAP variant costs local ranking (research.md D2).
 *
 * Values are read from lib/data/business.ts so the kit can never drift from
 * the website. Re-run after any change there, then re-audit the listings.
 *
 * Usage: npm run business:kit
 */
import { readFileSync } from "node:fs";

const src = readFileSync("lib/data/business.ts", "utf8");

/** Pull a quoted value for `key:` out of the TS source (no bundler needed). */
const val = (key) => src.match(new RegExp(`${key}:\\s*"([^"]*)"`))?.[1] ?? "";

const name = val("name");

/** All contact lines from the `phones` array, primary first.
 *  Parsed per-object so JSDoc comments between fields can't break it. */
const phonesBlock = src.match(/const phones = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
const lines = [...phonesBlock.matchAll(/\{([\s\S]*?)\}/g)]
  .map(([, block]) => ({
    display: block.match(/display:\s*"([^"]+)"/)?.[1] ?? "",
    intl: block.match(/intl:\s*"([^"]+)"/)?.[1] ?? "",
    whatsapp: block.match(/whatsapp:\s*"([^"]+)"/)?.[1] ?? "",
  }))
  .filter((p) => p.display && p.intl && p.whatsapp);

if (!lines.length) {
  console.error("business-kit: could not parse any phone from lib/data/business.ts");
  process.exit(1);
}
const city = val("city");
const region = val("region");
const district = val("district");
const landmark = val("landmark");
const full = val("full");
const hours = val("label");
const lat = src.match(/lat:\s*([\d.]+)/)?.[1] ?? "";
const lng = src.match(/lng:\s*([\d.]+)/)?.[1] ?? "";
const SITE = "https://moket-elsuarye.com";

const line = "─".repeat(64);
const out = [];
const S = (t) => out.push(t);

S(line);
S("  BUSINESS LISTING KIT — copy these values EXACTLY");
S("  Source of truth: lib/data/business.ts (never retype from memory)");
S(line);
S("");
S("NAME (use verbatim, no keywords appended — keyword stuffing gets profiles suspended)");
S(`  ${name}`);
S("");
S("PHONE — primary line goes in the listing's main phone field;");
S("        additional lines go in the 'additional phones' field.");
lines.forEach((p, i) => {
  S(`  ${i === 0 ? "PRIMARY  " : "Additional"} : ${p.display}   (intl ${p.intl})`);
  S(`               WhatsApp: https://wa.me/${p.whatsapp}`);
});
S("");
S("ADDRESS");
S(`  Full     : ${full}`);
S(`  District : ${district}`);
S(`  Landmark : ${landmark}`);
S(`  City     : ${city}`);
S(`  Region   : ${region}`);
S(`  Country  : Saudi Arabia (SA)`);
S(`  Coords   : ${lat}, ${lng}   ← verify the pin on the map before saving`);
S("");
S("HOURS");
S(`  ${hours} (24/7 — set every day 00:00–24:00)`);
S("");
S("WEBSITE");
S(`  ${SITE}`);
S("");
S("CATEGORIES (primary category is the #1 local-pack ranking factor)");
S("  Primary   : متجر سجاد  (Carpet store)");
S("  Secondary : متجر أرضيات (Flooring store)");
S("              خدمة تركيب أرضيات (Flooring contractor)");
S("              متجر مفروشات (Home goods store)");
S("");
S("SERVICE AREA");
S(`  ${city} وجميع أحيائها (primary). Rest of KSA on project basis.`);
S("");
S("SHORT DESCRIPTION (≤ 200 chars)");
S(`  ${name} — موكيت مساجد ومكاتب، موكيت تركي، عشب صناعي، فينيل وباركيه،`);
S("  وأرضيات مطاطية وطبية. توصيل وتركيب احترافي وخدمة 24 ساعة في الرياض.");
S("");
S("LONG DESCRIPTION (≤ 750 chars)");
S(`  ${name} متجر متخصّص في ${city} يوفّر كل أنواع الموكيت والأرضيات:`);
S("  موكيت المساجد المقاوم للحريق بخطوط سجود منتظمة، موكيت المكاتب والشركات،");
S("  الموكيت التركي المشجّر للمجالس، العشب الصناعي للحدائق والأسطح، أرضيات");
S("  الفينيل والباركيه (HDF وSPC)، الأرضيات المطاطية للجيم والإسطبلات والأماكن");
S("  الرطبة، والأرضيات الطبية للمستشفيات والعيادات. نقدّم معاينة وقياسًا مجانيًا");
S("  داخل الرياض، وتركيبًا احترافيًا على أيدي فنيين متخصّصين، وخدمة على مدار");
S("  24 ساعة. تواصل عبر واتساب أو الهاتف للحصول على عرض سعر فوري.");
S("");
S("PRODUCTS / SERVICES TO ADD");
S("  موكيت مساجد · موكيت مكاتب · موكيت تركي مشجّر · عشب صناعي · فينيل رول");
S("  باركيه خشب · فينيل طبي · أرضيات مستشفيات · أرضيات جيم · أرضيات خيول");
S("  أرضيات مانعة للانزلاق · أرضيات مكتبية · تركيب موكيت وأرضيات");
S("");
S("KEY LINKS TO USE IN LISTINGS");
S(`  Website  : ${SITE}`);
S(`  Products : ${SITE}/mokeet`);
S(`  Install  : ${SITE}/services/tarkeeb`);
S(`  Contact  : ${SITE}/contact`);
S(`  Reviews  : ${SITE}/review`);
S("");
S(line);
S("  RULES");
S("  • Identical NAP everywhere — one character of difference splits signals.");
S("  • Never add keywords to the business name (suspension risk).");
S("  • Real photos only. No stock, no competitor images.");
S("  • Never buy reviews, never filter by sentiment, never gate.");
S(line);

console.log(out.join("\n"));
