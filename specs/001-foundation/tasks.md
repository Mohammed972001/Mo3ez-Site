<div dir="rtl" align="right">

# ✅ التاسكات · 001 — الأساس (Ordered Backlog)

> تُنفَّذ **بالترتيب**. لا يُفتح تاسك إلا بعد إغلاق السابق (build ناجح + معايير القبول + بوابة السكيل + تحديث السجلّ).
> كل تاسك = فرع `feature/T<NN>-<slug>` → PR على `develop`.
> الحالة: ⬜ لم يبدأ · 🟡 جارٍ · ✅ مكتمل

| # | التاسك | الحالة |
|---|---|---|
| T00 | تهيئة المشروع (Scaffold) | ✅ |
| T01 | الثيم والتوكنز + الخطوط (Light/Dark) | ✅ |
| T02 | عناصر UI الأساسية (Primitives) | ✅ |
| T03 | هيكل الصفحة (Navbar + Mega C + Footer + WhatsApp FAB) | ✅ |
| T04 | طبقة البيانات (٩ منتجات = ٩ فولدرات/NAP) | ✅ |
| T05 | خط أنابيب الصور (تحسين + slugs + alt) | 🟡 |
| T06 | معمارية SEO (metadata/JSON-LD/sitemap/robots/llms) | 🟡 |
| T07 | الرئيسية (تصميم A) | ✅ |
| T08 | الكتالوج (تصميم B) | ⬜ |
| T09 | صفحات التصنيف `/c/[category]` (B + محتوى SEO) | ⬜ |
| T10 | صفحة المنتج `/p/[product]` (تصميم A) | ⬜ |
| T11 | توليد العملاء (واتساب/اتصال/فورم عرض سعر) | ⬜ |
| T12 | نظام المدوّنة (MDX) — الأساس بلا مقالات | ⬜ |
| T13 | صفحات: من نحن / تواصل | ⬜ |
| T14 | تمريرة الأداء (CWV) | ⬜ |
| T15 | تمريرة a11y + RTL | ⬜ |
| T16 | الاختبارات (Playwright + Lighthouse CI) | ⬜ |
| T17 | إعداد النشر (Vercel) + QA نهائي | ⬜ |

> لاحقًا (خارج 001): توسيع الكلمات + صفحات المناطق · كتابة مقالات المدوّنة.

---

## التفاصيل ومعايير القبول

### T00 — تهيئة المشروع (Scaffold) ✅
Next.js (أحدث) + TS صارم + Tailwind v4 + ESLint/Prettier + هيكل المجلدات (خطة §2) + `lib/data/business.ts` (NAP) + `.env.example`. حذف/أرشفة ملفات الموكاب الثابتة إلى `design-reference/`.
**القبول:** `next build` و`next dev` يعملان · لينتر نظيف · صفحة `/` فاضية SSR · بوابة `clean-code-guard`.
**التنفيذ:** Next 16.2.9 / React 19.2 / Tailwind v4 / TS strict. `next build` ✅ (TS نظيف، `/` static). layout عربي RTL. هيكل المجلدات + `business.ts`. الموكاب في `design-reference/`. + تثبيت spec-kit الرسمي (skills + `/speckit-*`).

### T01 — الثيم والتوكنز + الخطوط ✅
متغيّرات CSS لـ Palette 3 (لايت) و5 (دارك) + اشتقاق success/sale/on-colors · ربطها في Tailwind `@theme` · خطوط Type 3 عبر `next/font` · `ThemeToggle` بلا وميض · `html lang=ar dir=rtl`.
**القبول:** تبديل لايت/دارك يعمل ويحترم `prefers-color-scheme` · تباين AA · CLS=0 عند التبديل · بوابة `web-design-guidelines`.
**التنفيذ:** `globals.css` توكنز Palette 3/5 (كلها AA — text 13:1/15.7:1، primary 6.5:1، accent 5.2:1، gold 7.8:1) مربوطة في Tailwind `@theme inline`. خطوط Type 3 (Fraunces/ريم كوفي/Sora/Cairo) self-hosted عبر `next/font` بـ swap. `ThemeToggle` + سكربت no-flash يحترم `prefers-color-scheme`. تحقّق بصري: لايت+دارك على 390px موبايل ✅، `next build` ✅.

### T02 — عناصر UI الأساسية ✅
نقل المكوّنات من `components.css`: Button (كل الأنواع) · Badge · Price (ر.س) · Rating · Card (pcard) · Input/Select · Chip · Qty · Swatch/Size · Breadcrumb · Skeleton · Empty · Toast. Tailwind، موبايل-أولاً، a11y، RTL.
**القبول:** معرض مكوّنات يطابق الموكاب · لمس ≥44px · focus-visible · بوابة `frontend-design`+`web-design-guidelines`.
**التنفيذ:** 15 ملف في `components/ui/` + `lib/utils/cn.ts`. RSC: المكوّنات التفاعلية client (Chip/Swatch/Qty/Toast/WishButton)، والعرضية server. ProductCard = server + رابط ممتدّ + `next/image` (أبعاد محجوزة). تحقّق: build أخضر، eslint نظيف، التوكنز والخطوط صحيحة في المعاينة، `:focus-visible` عام، أهداف لمس ≥44px.

### T03 — هيكل الصفحة ✅
UtilityBar + Navbar (sticky) + **Mega Menu تصميم C** + Footer + WhatsApp FAB. درج جوال. كله `<nav>/<footer>` دلالي وروابط `<a href>` حقيقية.
**القبول:** ملاحة كاملة بالكيبورد · موبايل-أولاً (درج) · روابط قابلة للزحف · CLS=0.
**التنفيذ:** `lib/data/categories.ts` (9 تصنيفات، slugs عربية) + 6 مكوّنات layout. القائمة الكبرى C تظهر بالـ CSS (group-hover/focus-within) فتبقى الروابط الـ9 في DOM للزحف. الروابط الداخلية عبر `next/link` (زحف + prefetch). ThemeToggle بلا حالة (تبديل الأيقونة بالـ CSS). تحقّق: build + eslint نظيفان، light=Palette 3 / dark=Palette 5 يتبدّلان، واتساب FAB برسالة معبّأة، درج جوال.

### T04 — طبقة البيانات
`categories.ts` + `products.ts` (مشتقّة من مجلدات `public`) + `business.ts` + مخططات `zod`. أوصاف/أسماء عربية + كلمات مفتاحية + FAQ لكل تصنيف.
**القبول:** بيانات مُتحقّقة بـ zod · تغطّي كل التصنيفات · معزولة وقابلة للاستبدال · اختبارات وحدة (`tdd`).

### T05 — خط أنابيب الصور
سكربت تحويل WebP/AVIF + إعادة تسمية slug + أبعاد + blur + خريطة `alt`. (خطة §4).
**القبول:** كل الصور محسّنة + slugs وصفية + alt عربي · أوزان أقل بكثير · أبعاد محجوزة (CLS).

### T06 — معمارية SEO
`lib/seo/metadata.ts` · `components/seo/JsonLd.tsx` · `app/sitemap.ts` · `app/robots.ts` · `app/llms.txt` · canonical/OG base.
**القبول:** sitemap/robots/llms صحيحة وتشمل كل المسارات · JSON-LD يجتاز Rich Results · لا تكرار canonical.

### T07 — الرئيسية (A) ✅
كل أقسام تصميم A (Hero، شريط ثقة، الأكثر طلبًا، تسوّق بالنوع، حسب المكان، أدلّة/إلهام، عروض + عدّاد، حسب الاستخدام، بانر، تواصل) ببيانات حقيقية. `Organization`+`LocalBusiness`+`WebSite` JSON-LD.
**القبول:** مطابقة A · LCP<2.5s (hero `priority`) · CLS<0.1 · SEO=100 · موبايل-أولاً.
**التنفيذ:** `app/page.tsx` (Server Component، static prerender) — نقل تصميم A من `Home.html` بأقسامه، مُكيَّفًا لموكيت + توليد عملاء (لا سلة/أسعار → «السعر عند الطلب» + CTA واتساب). CSS الهيرو وأقسام الهوم نُقل إلى `ds-storefront.css` مع **ريسبونسف موبايل-أولاً** (نقاط 1100/820/560 من ملاحظات «على الجوال» بالريفرنس). العدّاد التنازلي = `components/home/Countdown.tsx` (client، بلا hydration mismatch). الصور عبر `next/image` (hero `priority`، باقي lazy + `sizes`). `metadata` + JSON-LD (Organization/WebSite/LocalBusiness/OpeningHours). تحقّق: `next build` ✅ (`/` static)، `tsc` نظيف، SSR يعرض كل الأقسام، الصور عبر `/_next/image` بـ srcset، قواعد الريسبونسف مشحونة في bundle الإنتاج.

> ملاحظة انضباط: نُفِّذت T04 (طبقة البيانات) و T07 ضمن فرع `feature/storefront-design-system` المجمِّع للـ chrome+بيانات+هوم (معلَم مرئي واحد) بدل فرع T مستقل. الفروع القادمة (T08 المتجر، T10 المنتج) تعود لنمط `feature/T<NN>`. T05/T06 جزئيّتان: تحسين الصور تلقائي عبر `next/image`، و JSON-LD/metadata لكل صفحة موجودة — لكن `sitemap.ts`/`robots.ts`/`llms.txt` وخط أنابيب الـ slugs المركزي لسه (تُغلق قبل النشر).

### T08 — الكتالوج (B)
شبكة 4 أعمدة + فلاتر علوية + معاينة سريعة (تصميم B) لكل المنتجات. `ItemList` JSON-LD · ترقيم/تحميل.
**القبول:** مطابقة B · فلاتر تعمل (URL state للـ SEO) · CWV ضمن الميزانية.

### T09 — صفحات التصنيف
`/c/[category]` بتصميم B + **كتلة إجابة مباشرة (GEO)** + وصف عربي أصيل + **FAQ** + `ItemList`+`Breadcrumb`+`FAQPage`.
**القبول:** محتوى فريد لكل تصنيف · h1 بالكلمة المستهدفة · FAQ schema صحيح · SEO=100.

### T10 — صفحة المنتج (A)
معرض + مواصفات + تقييمات + CTA واتساب/عرض سعر (تصميم A). `Product`+`Breadcrumb` JSON-LD · صور alt.
**القبول:** مطابقة A · Product schema صحيح · CTA يفتح واتساب معبّأ · LCP<2.5s.

### T11 — توليد العملاء
WhatsApp FAB + أزرار CTA (`wa.me` معبّأة) + `tel:` + فورم `/quote` (Server Action + zod + honeypot).
**القبول:** الفورم يتحقّق ويُرسل · واتساب يفتح برسالة صحيحة · بلا spam مفتوح.

### T12 — نظام المدوّنة (MDX)
`/blog` فهرس + `/blog/[slug]` (MDX) + `Article`+`Breadcrumb` + metadata + `next/image`. **بلا مقالات** (تُكتب في النهاية).
**القبول:** النظام يعرض مقال تجريبي ويُحذف · Article schema صحيح · جاهز ليكتب المالك مقالات داخل الكود.

### T13 — من نحن / تواصل
`/about` (E-E-A-T: خبرة/ضمان/أعمال) + `/contact` (NAP موحّد + خريطة + واتساب/اتصال + ساعات).
**القبول:** NAP مطابق لـ business.ts · `LocalBusiness` schema · موبايل-أولاً.

### T14 — تمريرة الأداء (CWV)
قياس Lighthouse لكل صفحة رئيسية، إصلاح LCP/CLS/INP، تأكيد `priority`/أبعاد/تأجيل JS.
**القبول:** كل الصفحات ضمن ميزانية المادة 3 · تقرير مرفق.

### T15 — تمريرة a11y + RTL
فحص WCAG AA، تباين، focus، tab order، `prefers-reduced-motion`، سلامة RTL على كل صفحة.
**القبول:** A11y≥95 · لا مشاكل RTL · بوابة `web-design-guidelines`.

### T16 — الاختبارات
Playwright لمسارات حرجة (تحميل، ملاحة، فورم، واتساب) + Lighthouse CI في الـ pipeline.
**القبول:** اختبارات خضراء · بوابة `test-guard` · CI يفشل عند كسر الميزانية.

### T17 — النشر + QA نهائي
إعداد Vercel (أو البديل) + متغيّرات البيئة + فحص نهائي شامل لكل معايير القبول.
**القبول:** نشر ناجح · كل بنود DoD في المواصفات ✅ · سجلّ القرارات محدَّث.

</div>
