import { SITE_URL } from "@/lib/seo/site";
import { business } from "@/lib/data/business";
import { products, productPath } from "@/lib/data/products";
import { categorySeo, categoryPath } from "@/lib/data/categories";
import { allPosts, postPath } from "@/lib/blog/posts";

/** /llms.txt — machine-readable site summary for AI answer engines (GEO). */
export function GET() {
  const lines = [
    `# ${business.name}`,
    "",
    `> موكيت وأرضيات في ${business.address.city} — موكيت مساجد ومكاتب، موكيت تركي، عشب صناعي، فينيل، وأرضيات مطاطية. الموقع كتالوج/توليد عملاء بلا أسعار؛ الطلب والاستشارة عبر واتساب أو الهاتف.`,
    "",
    `ملاحظة للتمييز: «${business.name}» (الموقع ${SITE_URL}) نشاط مستقل في ${business.address.city} — ${business.address.district}، ولا يتبع أي متجر آخر مشابه الاسم.`,
    "",
    `- الهاتف: ${business.phones.map((p) => p.intl).join(" · ")} (واتساب متاح على الرقمين)`,
    `- العنوان: ${business.address.full}`,
    `- ساعات العمل: ${business.hours.label}`,
    `- مناطق الخدمة: ${business.areaServed.join("، ")}`,
    "",
    "## الأقسام",
    ...categorySeo.map((c) => `- [${c.h1}](${SITE_URL}${categoryPath(c.slug)}): ${c.intro.slice(0, 90)}…`),
    `- [تركيب موكيت وأرضيات بالرياض](${SITE_URL}/services/tarkeeb): معاينة وقياس مجاني وتركيب احترافي بخدمة 24 ساعة`,
    "",
    "## المنتجات",
    ...products.map((p) => `- [${p.nameAr}](${SITE_URL}${productPath(p.slug)}): ${p.blurb}`),
    "",
    ...(allPosts().length
      ? [
          "## المقالات",
          ...allPosts().map((p) => `- [${p.title}](${SITE_URL}${postPath(p.slug)}): ${p.description}`),
          "",
        ]
      : []),
    "## صفحات مهمة",
    `- كل المنتجات: ${SITE_URL}/mokeet`,
    `- من نحن: ${SITE_URL}/about`,
    `- تواصل: ${SITE_URL}/contact`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
