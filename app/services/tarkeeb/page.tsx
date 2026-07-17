import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/icon";
import { business, whatsappLink, telLink } from "@/lib/data/business";
import { categorySeo, categoryPath } from "@/lib/data/categories";
import { SITE_URL } from "@/lib/seo/site";

/* Installation-service landing page (spec 002, T013). SERP research (D2)
   showed «تركيب موكيت بالرياض» is a distinct high-intent query served by
   dedicated phone-first service pages — this page owns that intent. */

const PAGE_PATH = "/services/tarkeeb";
const UPDATED = "2026-07-18";

export const metadata: Metadata = {
  title: `تركيب موكيت وأرضيات بالرياض | فني تركيب محترف — ${business.name}`,
  description:
    "تركيب موكيت وأرضيات بالرياض على أيدي فنيين محترفين: موكيت مساجد ومكاتب، فينيل، عشب صناعي، وأرضيات مطاطية. معاينة وقياس مجاني وخدمة 24 ساعة — اطلب فني تركيب عبر واتساب.",
  keywords: ["تركيب موكيت بالرياض", "فني تركيب موكيت", "تركيب عشب صناعي بالرياض", "تركيب فينيل", "تركيب أرضيات الرياض"],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: business.name,
    title: "تركيب موكيت وأرضيات بالرياض — معاينة مجانية وخدمة 24 ساعة",
    description: "فريق تركيب محترف لكل أنواع الموكيت والأرضيات في الرياض، مع معاينة وقياس مجاني.",
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

const steps: { t: string; d: string }[] = [
  { t: "تواصل وأرسل التفاصيل", d: "راسلنا على واتساب بصور المكان والمساحة التقريبية ونوع الأرضية المطلوبة، أو اتصل مباشرة." },
  { t: "معاينة وقياس مجاني", d: "يزورك فنينا داخل الرياض لقياس المساحة بدقة، ومعك عيّنات حقيقية تختار منها الخامة واللون." },
  { t: "عرض سعر فوري وواضح", d: "تستلم عرض السعر شاملًا الخامة والتركيب دون تكاليف مخفية، وبأسعار جملة للمشاريع والمساجد." },
  { t: "تجهيز وتركيب احترافي", d: "نجهّز السطح (تسوية وتنظيف) ثم نركّب بتثبيت محكم وتشطيب دقيق عند الحواف والأعمدة والوصلات." },
  { t: "فحص وتسليم", d: "نفحص التشطيب معك ونسلّمك المكان نظيفًا جاهزًا للاستخدام، مع إرشادات العناية." },
];

const areas = [
  "شمال الرياض", "جنوب الرياض", "شرق الرياض", "غرب الرياض", "وسط الرياض",
  "العزيزية", "النسيم", "الروضة", "العليا", "الملز", "السويدي", "لبن", "الدرعية", "الخرج",
];

const services: { icon: IconName; t: string; d: string; href: string }[] = [
  { icon: "star", t: "تركيب موكيت", d: "مساجد، مكاتب، ومجالس — رول وبلاط", href: categoryPath("موكيت") },
  { icon: "sparkle", t: "تركيب عشب صناعي", d: "حدائق وأسطح مع تجهيز الأرضية والتصريف", href: categoryPath("عشب-صناعي") },
  { icon: "ruler", t: "تركيب فينيل", d: "رول وبلاط بمظهر الخشب ضد الماء", href: categoryPath("فينيل-وأرضيات") },
  { icon: "shield", t: "تركيب أرضيات مطاطية", d: "جيم، إسطبلات، وأماكن رطبة", href: categoryPath("أرضيات-مطاطية") },
];

const faqs: { q: string; a: string }[] = [
  { q: "هل المعاينة والقياس مجانية؟", a: "نعم، المعاينة والقياس داخل الرياض مجانية بالكامل، ومعها عيّنات حقيقية تساعدك على الاختيار قبل أي التزام." },
  { q: "كم تكلفة تركيب الموكيت بالرياض؟", a: "التكلفة تعتمد على المساحة ونوع الخامة وحالة الأرضية؛ بعد المعاينة تستلم عرض سعر شاملًا وواضحًا دون تكاليف مخفية." },
  { q: "هل تركّبون فوق البلاط القديم؟", a: "في أغلب الحالات نعم — الموكيت والفينيل والمطاط تُركّب فوق الأسطح المستوية النظيفة، والمعاينة تؤكّد الجاهزية." },
  { q: "كم يستغرق التركيب؟", a: "أغلب المساحات السكنية والمكتبية تُنجز في يوم واحد؛ المساجد والمشاريع الكبيرة تُجدول حسب المساحة وتُنجز بسرعة وإتقان." },
  { q: "هل تعملون خارج الرياض؟", a: "تركيزنا الرياض بخدمة 24 ساعة، ونغطي بقية مدن المملكة للمشاريع حسب الاتفاق." },
];

export default function TarkeebPage() {
  const wa = whatsappLink("السلام عليكم، أحتاج فني تركيب — أرغب بمعاينة وعرض سعر");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "خدمة التركيب" },
        ],
      },
      {
        "@type": "Service",
        name: "تركيب موكيت وأرضيات بالرياض",
        serviceType: "تركيب موكيت وأرضيات",
        areaServed: { "@type": "City", name: "الرياض" },
        provider: { "@type": "LocalBusiness", name: business.name, telephone: business.phone.intl },
        url: `${SITE_URL}${PAGE_PATH}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="sec" style={{ paddingBlock: 28 }}>
        <div className="wrap">
          <nav className="crumbs" style={{ marginBottom: 8 }} aria-label="مسار التصفّح">
            <Link href="/">الرئيسية</Link>
            <Icon name="chevLeft" className="sep" />
            <span className="cur">خدمة التركيب</span>
          </nav>

          <h1 style={{ fontSize: 32 }}>تركيب موكيت وأرضيات بالرياض</h1>

          {/* GEO direct-answer block */}
          <p className="shop-intro">
            فريق تركيب محترف لكل أنواع الموكيت والأرضيات في الرياض: موكيت مساجد ومكاتب، فينيل، عشب
            صناعي، وأرضيات مطاطية — بمعاينة وقياس مجاني، وعرض سعر واضح، وتجهيز كامل للسطح، وتشطيب
            دقيق عند الحواف. خدمة 24 ساعة في كل أحياء الرياض.
          </p>
          <p className="cat-updated">
            <Icon name="check" /> آخر تحديث: <time dateTime={UPDATED}>١٨ يوليو ٢٠٢٦</time>
          </p>

          <div className="cta-row" style={{ marginBlock: 18 }}>
            <a className="btn btn-accent btn-lg" href={wa} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /> اطلب فني تركيب واتساب
            </a>
            <a className="btn btn-secondary btn-lg" href={telLink} dir="ltr">
              <Icon name="phone" /> {business.phone.display}
            </a>
          </div>

          {/* What we install — links back to category hubs */}
          <section style={{ marginTop: 32 }} aria-labelledby="svc-h">
            <div className="s-head">
              <div>
                <div className="kick">ماذا نركّب؟</div>
                <h2 id="svc-h">خدمات التركيب</h2>
              </div>
            </div>
            <div className="pgrid c4">
              {services.map((s) => (
                <Link key={s.t} href={s.href} className="info-card" style={{ display: "block" }}>
                  <div className="ic">
                    <Icon name={s.icon} />
                  </div>
                  <b>{s.t}</b>
                  <span>{s.d}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Process steps (numbered — HowTo-friendly structure) */}
          <section style={{ marginTop: 40 }} aria-labelledby="steps-h">
            <div className="s-head">
              <div>
                <div className="kick">كيف نعمل؟</div>
                <h2 id="steps-h">خطوات التركيب من الطلب للتسليم</h2>
              </div>
            </div>
            <ol className="steps-list">
              {steps.map((s, i) => (
                <li key={s.t}>
                  <span className="num">{i + 1}</span>
                  <div>
                    <b>{s.t}</b>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Areas served */}
          <section style={{ marginTop: 40 }} aria-labelledby="areas-h">
            <div className="s-head">
              <div>
                <div className="kick">أين نخدم؟</div>
                <h2 id="areas-h">مناطق التركيب في الرياض</h2>
              </div>
            </div>
            <div className="chips">
              {areas.map((a) => (
                <span key={a} className="chip">
                  {a}
                </span>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginTop: 40 }} aria-labelledby="svc-faq-h">
            <div className="s-head">
              <div>
                <div className="kick">يسألنا العملاء</div>
                <h2 id="svc-faq-h">أسئلة شائعة عن التركيب</h2>
              </div>
            </div>
            <div className="faq-list">
              {faqs.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>
                    <h3>{f.q}</h3>
                    <Icon name="chevDown" className="fchev" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Category cross-links */}
          <section style={{ marginTop: 40 }} aria-labelledby="svc-cats-h">
            <div className="s-head">
              <div>
                <div className="kick">تصفّح المنتجات</div>
                <h2 id="svc-cats-h">اختر أرضيتك ثم اطلب التركيب</h2>
              </div>
              <Link className="more" href="/mokeet">
                كل المنتجات <Icon name="chevLeft" />
              </Link>
            </div>
            <div className="chips">
              {categorySeo.map((c) => (
                <Link key={c.slug} href={categoryPath(c.slug)} className="chip">
                  {c.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
