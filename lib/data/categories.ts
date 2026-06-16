import type { IconName } from "@/components/ui/icon";

/**
 * تصنيفات المتجر — النسخة الأساسية (slug + اسم + أيقونة + نبذة).
 * يستهلكها النافبار والقائمة الكبرى والفوتر. تُثرى في T04 بالأوصاف
 * والكلمات المفتاحية وأسئلة FAQ والصور والمنتجات.
 * slugs عربية وصفية ثابتة (الدستور: المادة 1/6).
 */
export interface Category {
  /** مجلد الصور المصدر تحت public/ */
  source: string;
  /** slug عربي ثابت في المسار /c/<slug> */
  slug: string;
  nameAr: string;
  /** نبذة قصيرة للقائمة الكبرى */
  blurb: string;
  icon: IconName;
}

export const categories: Category[] = [
  { source: "msaged", slug: "موكيت-مساجد", nameAr: "موكيت مساجد", blurb: "فرش مصلّيات مقاوم للحريق بتصاميم إسلامية", icon: "star" },
  { source: "mokeet makteb", slug: "موكيت-مكاتب", nameAr: "موكيت مكاتب", blurb: "موكيت شركات ومكاتب عملي ومتين", icon: "bag" },
  { source: "turky mshager", slug: "موكيت-تركي", nameAr: "موكيت تركي مشجّر", blurb: "موكيت فاخر بنقوش تركية للغرف والمجالس", icon: "swatch" },
  { source: "3shb", slug: "عشب-صناعي", nameAr: "عشب صناعي", blurb: "ثيل صناعي للحدائق والأسطح والملاعب", icon: "sparkle" },
  { source: "vinyl roll", slug: "فينيل", nameAr: "فينيل رول", blurb: "أرضيات فينيل وباركيه ضد الماء", icon: "ruler" },
  { source: "Rabal-GEM", slug: "أرضيات-جيم", nameAr: "أرضيات مطاطية (جيم)", blurb: "مطاط أرضيات للصالات الرياضية", icon: "shield" },
  { source: "Non-slip, moisture-proof, and fire-resistant horse flooring rubber", slug: "أرضيات-خيول", nameAr: "أرضيات خيول", blurb: "مطاط مقاوم للرطوبة والحريق للإسطبلات", icon: "truck" },
  { source: "Non-slip rubber flooring and toilets", slug: "أرضيات-مانعة-للانزلاق", nameAr: "أرضيات مانعة للانزلاق", blurb: "أرضيات مطاطية للحمامات ودورات المياه", icon: "info" },
  { source: "makteb", slug: "أرضيات-مكتبية", nameAr: "أرضيات مكتبية", blurb: "حلول أرضيات عملية للمكاتب", icon: "grid" },
];

export function categoryPath(slug: string): string {
  return `/c/${slug}`;
}
