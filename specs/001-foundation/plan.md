<div dir="rtl" align="right">

# 🛠️ الخطة التقنية · 001 — الأساس (Technical Plan)

> «كيف». يحكمها [الدستور](../../.specify/memory/constitution.md) و[المواصفات](./spec.md).

## 1) حزمة التقنيات (Stack)
- **Next.js (أحدث مستقر، App Router) · React Server Components · TypeScript صارم (`strict`).**
- **Tailwind CSS (v4)** — مع **توكنز التصميم كمتغيّرات CSS** مربوطة في `@theme`، فيبقى Light(Palette 3)/Dark(Palette 5) و Type 3 مضبوطين. وقت-البناء = صفر runtime CSS (يحمي CLS).
- **الخطوط:** `next/font` (استضافة ذاتية): Fraunces + Reem Kufi (عناوين) · Sora + Cairo (نص). `display:swap` + `size-adjust`.
- **الصور:** `next/image` (AVIF/WebP، `sizes`، `priority` لعنصر LCP، blur placeholder).
- **المحتوى/المدوّنة:** MDX في `content/blog` (gray-matter + `next-mdx-remote/rsc`).
- **التحقّق:** `zod` لكل بيانات/فورم عند الحدود.
- **الفورم:** Server Action + `zod` + honeypot؛ الإرسال (مرحلة v1) عبر رابط واتساب مُعبّأ + (اختياري) بريد.
- **الاختبار:** Playwright (مسارات حرجة) + Lighthouse CI (CWV/SEO).
- **النشر:** Vercel (تحسين الصور + ISR جاهزة) — مبدئيًّا.

## 2) هيكل المجلدات
```
app/
  layout.tsx            # html lang=ar dir=rtl, الخطوط, الثيم, JSON-LD عام
  page.tsx              # الرئيسية (A)
  mokeet/page.tsx       # الكتالوج (B)
  c/[category]/page.tsx # تصنيف (B + محتوى SEO)
  p/[product]/page.tsx  # منتج (A)
  blog/page.tsx · blog/[slug]/page.tsx
  about · contact · quote
  sitemap.ts · robots.ts · llms.txt/route.ts
components/
  ui/        # primitives: Button, Badge, Price, Rating, Card, Input, Chip…
  layout/    # UtilityBar, Navbar, MegaMenu(C), Footer, ThemeToggle, WhatsAppFab
  sections/  # Hero, TrustStrip, CategoryGrid, BudgetBand, Inspo, Offers, Newsletter…
  seo/       # JsonLd, Breadcrumbs
lib/
  data/      # categories.ts, products.ts, business.ts (NAP), images.ts
  seo/       # metadata helpers, jsonld builders, slugs
  utils/
content/blog/   # مقالات MDX (تُكتب في النهاية)
public/          # الصور (تُحسَّن/تُعاد تسميتها بـ slug)
styles/          # globals.css (tokens, reset, RTL base)
tests/           # playwright + unit
```

## 3) الثيم والتوكنز (Light/Dark)
- توكنز CSS في `:root` (Palette 3 · Warm Artisan) و`[data-theme="dark"]` (Palette 5 · Dark Premium)، تُشتقّ
  منها قيم success/sale/on-colors بنفس منهج النظام الحالي، وتُربط في Tailwind `@theme`
  (مثال: `--color-bg`, `--color-primary`, `--color-accent`, `--color-accent-ink`…).
- تبديل الوضع عبر `ThemeToggle` + احترام `prefers-color-scheme`، بلا وميض (script مبكر/`color-scheme`).
- كل المسافات/الزوايا منطقية (logical properties) لـ RTL.

## 4) خط أنابيب الصور (Image Pipeline) — حرج للـ SEO/الأداء
- سكربت build لمرّة واحدة: قراءة `public/<category>/*` → تحويل لـ WebP/AVIF محسّن، إعادة تسمية بـ
  slug عربي/معرّب وصفي (مثل `mokeet-masajed-01.webp`)، توليد أبعاد + blur placeholder.
- خريطة في `lib/data/images.ts` تربط كل صورة بـ `alt` عربي وصفي.

## 5) معمارية SEO في الكود
- `lib/seo/metadata.ts`: مولّد `Metadata` موحّد (title/description/canonical/OG/hreflang).
- `components/seo/JsonLd.tsx`: مكوّنات لكل نوع schema.
- `app/sitemap.ts` + `app/robots.ts` + `app/llms.txt` ديناميكية من طبقة البيانات.
- روابط داخلية مُمنهجة (تصنيف↔منتج↔مقال).

## 6) ميزانية الأداء (تُفرض في CI)
LCP<2.5s · CLS<0.1 · INP<200ms · حجم JS أوّلي منخفض (RSC، تأجيل العميل، بلا third-party ثقيل).

## 7) المخاطر والتخفيف
- **صور واتساب ثقيلة/أسماء سيئة** → خط الأنابيب (بند 4) إلزامي قبل أي صفحة.
- **Tailwind + توكنز ديناميكية للثيم** → نعتمد متغيّرات CSS داخل `@theme` لا قيم ثابتة.
- **مطابقة الموكاب 1:1** → ننقل من `components.css`/`store.css` كمصدر حقيقة، ونتحقّق بصريًّا لكل صفحة.

## 8) التحقّق
كل تاسك يُغلق بعد: build ناجح + معايير قبوله + بوابة السكيل (`clean-code-guard`/`web-design-guidelines`/`test-guard`) + قياس CWV عند اللزوم + تحديث سجلّ القرارات.

</div>
