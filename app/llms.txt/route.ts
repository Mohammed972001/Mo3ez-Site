import { SITE_URL } from "@/lib/seo/site";
import { business } from "@/lib/data/business";
import { products, productPath } from "@/lib/data/products";

/** /llms.txt — ملخّص للموقع لمحرّكات الإجابة بالذكاء الاصطناعي (GEO). */
export function GET() {
  const lines = [
    `# ${business.name}`,
    "",
    `> موكيت وأرضيات في ${business.address.city} — موكيت مساجد ومكاتب، موكيت تركي، عشب صناعي، فينيل، وأرضيات مطاطية. الموقع كتالوج/توليد عملاء بلا أسعار؛ الطلب والاستشارة عبر واتساب أو الهاتف.`,
    "",
    `- الهاتف: ${business.phone.intl} (واتساب: ${business.phone.whatsapp})`,
    `- العنوان: ${business.address.full}`,
    `- ساعات العمل: ${business.hours.label}`,
    `- مناطق الخدمة: ${business.areaServed.join("، ")}`,
    "",
    "## المنتجات",
    ...products.map((p) => `- [${p.nameAr}](${SITE_URL}${productPath(p.slug)}): ${p.blurb}`),
    "",
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
