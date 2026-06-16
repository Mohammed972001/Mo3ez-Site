/**
 * gen-gallery.mjs — يقرأ صور كل فولدر منتج تحت public/ ويولّد lib/data/gallery.generated.ts.
 * نموذج: كل فولدر = منتج واحد، وكل صوره تُعرض في معرض المنتج. بلا إعادة تسمية.
 * شغّله بعد تغيير الصور: `node scripts/gen-gallery.mjs`
 */
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";

const PUBLIC = "public";
const IMG = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

// slug المنتج (عربي ثابت) → الفولدر المصدر + الاسم العربي (لنص alt)
const PRODUCTS = [
  { slug: "موكيت-مساجد", folder: "msaged", nameAr: "موكيت مساجد" },
  { slug: "موكيت-مكاتب", folder: "mokeet makteb", nameAr: "موكيت مكاتب" },
  { slug: "موكيت-تركي", folder: "turky mshager", nameAr: "موكيت تركي مشجّر" },
  { slug: "عشب-صناعي", folder: "3shb", nameAr: "عشب صناعي" },
  { slug: "فينيل", folder: "vinyl roll", nameAr: "فينيل رول" },
  { slug: "أرضيات-جيم", folder: "Rabal-GEM", nameAr: "أرضيات مطاطية للجيم" },
  { slug: "أرضيات-خيول", folder: "Non-slip, moisture-proof, and fire-resistant horse flooring rubber", nameAr: "أرضيات مطاطية للخيول" },
  { slug: "أرضيات-مانعة-للانزلاق", folder: "Non-slip rubber flooring and toilets", nameAr: "أرضيات مانعة للانزلاق" },
  { slug: "أرضيات-مكتبية", folder: "makteb", nameAr: "أرضيات مكتبية" },
];

const encPath = (folder, file) => "/" + encodeURIComponent(folder) + "/" + encodeURIComponent(file);

const out = {};
for (const p of PRODUCTS) {
  const dir = join(PUBLIC, p.folder);
  const files = readdirSync(dir)
    .filter((f) => statSync(join(dir, f)).isFile() && IMG.has(extname(f).toLowerCase()))
    .sort();
  out[p.slug] = files.map((f, i) => ({
    src: encPath(p.folder, f),
    alt: `${p.nameAr} — صورة ${i + 1} — الرياض`,
  }));
}

const body =
  "// مولّد آليًّا عبر scripts/gen-gallery.mjs — لا تعدّله يدويًّا.\n" +
  "// نموذج: كل فولدر = منتج، وكل صوره معرض. أعِد التوليد بعد تغيير الصور.\n\n" +
  "export interface GalleryImage { src: string; alt: string; }\n\n" +
  "export const gallery: Record<string, GalleryImage[]> = " +
  JSON.stringify(out, null, 2) +
  ";\n";

writeFileSync(join("lib", "data", "gallery.generated.ts"), body);
console.log(Object.entries(out).map(([k, v]) => `${k}: ${v.length} صورة`).join("\n"));
console.log("الإجمالي:", Object.values(out).reduce((a, v) => a + v.length, 0));
