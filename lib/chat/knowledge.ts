// What the chat assistant is allowed to know: built from the same data files the pages
// render (like /llms.txt), so a fact changed there reaches the assistant on the next deploy.
import { SITE_URL } from "@/lib/seo/site";
import { business, whatsappLink } from "@/lib/data/business";
import { products, productPath } from "@/lib/data/products";
import { categorySeo, categoryPath } from "@/lib/data/categories";
import { allPosts, postPath } from "@/lib/blog/posts";
import type { ChatSite } from "./core";

const lines: string[] = [
  `# ${business.name}`,
  "الموقع كتالوج بلا أسعار؛ الطلب والاستشارة عبر واتساب أو الهاتف.",
  `- الهاتف وواتساب: ${business.phones.map((p) => p.display).join(" · ")}`,
  `- العنوان: ${business.address.full}`,
  `- ساعات العمل: ${business.hours.label}`,
  `- مناطق الخدمة: ${business.areaServed.join("، ")}`,
  "",
  "## الأقسام",
];
for (const c of categorySeo) {
  lines.push(`### ${c.h1} — ${SITE_URL}${categoryPath(c.slug)}`, c.intro, c.body, ...c.faqs.map((f) => `س: ${f.q}\nج: ${f.a}`), "");
}
lines.push("## المنتجات");
for (const p of products) {
  lines.push(
    `### ${p.nameAr} — ${SITE_URL}${productPath(p.slug)}`,
    p.intro,
    ...p.features.map((f) => `- ${f}`),
    ...p.specs.map((s) => `- ${s.k}: ${s.v}`),
    ...p.faq.map((f) => `س: ${f.q}\nج: ${f.a}`),
    "",
  );
}
const posts = allPosts();
if (posts.length) {
  lines.push("## المقالات", ...posts.map((p) => `- ${p.title} — ${SITE_URL}${postPath(p.slug)}\n  ${p.description}`), "");
}
lines.push("## صفحات مهمة", `- كل المنتجات: ${SITE_URL}/mokeet`, `- تركيب الموكيت والأرضيات: ${SITE_URL}/services/tarkeeb`, `- تواصل: ${SITE_URL}/contact`);

export const CHAT_SITE: ChatSite = {
  name: business.name,
  niche: "موكيت وأرضيات في الرياض",
  phone: business.phone.display,
  whatsappUrl: whatsappLink("السلام عليكم، أرغب بالاستفسار عن الموكيت والأرضيات."),
  knowledge: lines.join("\n"),
};
