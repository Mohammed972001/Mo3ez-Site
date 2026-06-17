import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/icon";
import { business, whatsappLink, telLink } from "@/lib/data/business";

const SITE_URL = "https://www.mokeet-elsuarye.com";

export const metadata: Metadata = {
  title: `من نحن | ${business.name} — موكيت وأرضيات في ${business.address.city}`,
  description:
    "تعرّف على السريع للموكيت والأرضيات في الرياض: خبرة في موكيت المساجد والمكاتب، العشب الصناعي، الفينيل، والأرضيات المطاطية، مع توصيل وتركيب احترافي وخدمة 24 ساعة لكل مدن المملكة.",
  alternates: { canonical: "/about" },
};

function LocalBusinessLd() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: `${SITE_URL}/about`,
    telephone: business.phone.intl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.district} - ${business.address.landmark}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    areaServed: business.areaServed,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}

const why: [IconName, string, string][] = [
  ["shield", "خبرة وجودة", "خامات أصلية مختارة تناسب المناخ والاستخدام الكثيف."],
  ["truck", "توصيل وتركيب", "فريق تركيب محترف لكل مدن المملكة."],
  ["star", "استشارة مجانية", "نساعدك في اختيار النوع والمقاس الأنسب لمساحتك."],
  ["phone", "خدمة 24 ساعة", "تواصل معنا في أي وقت عبر واتساب أو الهاتف."],
];

export default function AboutPage() {
  return (
    <main>
      <LocalBusinessLd />
      <section className="page-hero">
        <div className="wrap">
          <div className="kick">من نحن</div>
          <h1>{business.name}</h1>
          <p>
            متخصّصون في الموكيت والأرضيات في {business.address.city} — موكيت المساجد والمكاتب، الموكيت
            التركي، العشب الصناعي، الفينيل، والأرضيات المطاطية — بخامات أصلية وتوصيل وتركيب احترافي.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="prose">
            <h2>قصتنا</h2>
            <p>
              بدأنا برؤية بسيطة: أن نوفّر للعميل في {business.address.city} وكل المملكة موكيتًا وأرضياتٍ
              تجمع الجودة والسعر المناسب مع تركيب يدوم. على مدى سنوات خدمنا المساجد والشركات والمنازل
              والمنشآت الرياضية، وبنينا ثقة عملائنا بالالتزام بالمواعيد وجودة الخامة ونظافة التركيب.
            </p>
            <h2>ماذا نقدّم</h2>
            <ul>
              <li>موكيت مساجد مقاوم للحريق بخطوط سجود منتظمة.</li>
              <li>موكيت مكاتب وشركات متين وعملي (رول وبلاط).</li>
              <li>موكيت تركي مشجّر فاخر للمجالس والغرف.</li>
              <li>عشب صناعي للحدائق والأسطح والملاعب.</li>
              <li>فينيل وأرضيات صلبة مقاومة للماء.</li>
              <li>أرضيات مطاطية للصالات الرياضية والإسطبلات والحمامات.</li>
            </ul>

            <h2>لماذا تختارنا</h2>
          </div>

          <div className="info-grid" style={{ marginTop: 8 }}>
            {why.map(([icon, t, s]) => (
              <div className="info-card" key={t}>
                <div className="ic">
                  <Icon name={icon} />
                </div>
                <div>
                  <b>{t}</b>
                  <span>{s}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cta-row" style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <a className="btn btn-accent btn-lg" href={whatsappLink("السلام عليكم، أرغب بالاستفسار والاستشارة")} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /> تواصل واتساب
            </a>
            <Link className="btn btn-secondary btn-lg" href="/mokeet">
              تصفّح المنتجات
            </Link>
            <a className="btn btn-ghost btn-lg" href={telLink} dir="ltr">
              <Icon name="phone" /> {business.phone.display}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
