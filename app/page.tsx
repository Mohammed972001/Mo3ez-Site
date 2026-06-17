import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/icon";
import { Countdown } from "@/components/home/Countdown";
import { ProductCard } from "@/components/home/ProductCard";
import { business, whatsappLink, telLink } from "@/lib/data/business";
import { products, productPath, productHero, productImages } from "@/lib/data/products";

const SITE_URL = "https://www.mokeet-elsuarye.com";

/* ---------------------------------------------------------------- SEO */
export const metadata: Metadata = {
  title: `${business.name} | موكيت وأرضيات وعشب صناعي وفينيل في ${business.address.city}`,
  description:
    "السريع للموكيت والأرضيات في الرياض — موكيت مساجد ومكاتب، موكيت تركي، عشب صناعي، فينيل، وأرضيات مطاطية للجيم والخيول والحمامات. توصيل وتركيب احترافي وخدمة 24 ساعة. اطلب عرض سعر عبر واتساب.",
  keywords: [
    "موكيت",
    "موكيت الرياض",
    "موكيت مساجد",
    "موكيت مكاتب",
    "عشب صناعي",
    "فينيل",
    "أرضيات",
    "سجاد",
    "مفروشات",
    "السريع للموكيت",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: business.name,
    title: `${business.name} — موكيت وأرضيات في ${business.address.city}`,
    description:
      "موكيت مساجد ومكاتب، عشب صناعي، فينيل، وأرضيات مطاطية — توصيل وتركيب احترافي في الرياض وكل المملكة.",
    url: SITE_URL,
  },
};

/* ------------------------------------------------------------ JSON-LD */
function HomeJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: business.name,
        url: SITE_URL,
        telephone: business.phone.intl,
        areaServed: business.areaServed,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: business.name,
        inLanguage: "ar",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: business.name,
        image: `${SITE_URL}${productHero(products[0].slug)?.src ?? ""}`,
        url: SITE_URL,
        telephone: business.phone.intl,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: `${business.address.district} - ${business.address.landmark}`,
          addressLocality: business.address.city,
          addressRegion: business.address.region,
          addressCountry: business.address.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        areaServed: business.areaServed,
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

/* ---------------------------------------------------- بيانات الأقسام */
const trust: [IconName, string, string][] = [
  ["truck", "توصيل وتركيب احترافي", "لكل مدن المملكة"],
  ["shield", "ضمان على الجودة", "خامات أصلية تدوم"],
  ["phone", "خدمة 24 ساعة", "تواصل في أي وقت"],
  ["star", "استشارة مجانية", "نساعدك في الاختيار والمقاس"],
];

const bestSlugs = ["موكيت-مساجد", "موكيت-تركي", "عشب-صناعي", "فينيل", "موكيت-مكاتب", "أرضيات-جيم"];

const usageBand: { place: string; sub: string; slug: string; bg: string }[] = [
  { place: "المساجد والمصلّيات", sub: "موكيت مساجد مقاوم للحريق", slug: "موكيت-مساجد", bg: "#5E6B5A" },
  { place: "المكاتب والشركات", sub: "موكيت وأرضيات عملية", slug: "موكيت-مكاتب", bg: "#837C72" },
  { place: "الحدائق والأسطح", sub: "عشب صناعي طبيعي المظهر", slug: "عشب-صناعي", bg: "#4e7a5e" },
  { place: "الحمامات والمسابح", sub: "أرضيات مانعة للانزلاق", slug: "أرضيات-مانعة-للانزلاق", bg: "#2C2925" },
];

const offersSlugs = ["فينيل", "موكيت-تركي", "أرضيات-مكتبية", "أرضيات-خيول"];

const styleTiles: { t: string; c: string; slug: string }[] = [
  { t: "المساجد", c: "موكيت مساجد", slug: "موكيت-مساجد" },
  { t: "المجالس والغرف", c: "موكيت تركي مشجّر", slug: "موكيت-تركي" },
  { t: "المكاتب", c: "أرضيات مكتبية", slug: "أرضيات-مكتبية" },
  { t: "الصالات الرياضية", c: "أرضيات مطاطية", slug: "أرضيات-جيم" },
  { t: "الإسطبلات", c: "أرضيات خيول", slug: "أرضيات-خيول" },
  { t: "الحدائق والأسطح", c: "عشب صناعي", slug: "عشب-صناعي" },
];

/* -------------------------------------------------- إطار صورة خلفية */
function Bg({ slug, index = 0, sizes }: { slug: string; index?: number; sizes: string }) {
  const imgs = productImages(slug);
  const img = imgs[index] ?? imgs[0];
  if (!img) return null;
  return <Image src={img.src} alt={img.alt} fill sizes={sizes} className="bgimg" />;
}

/* ===================================================================== */
export default function HomePage() {
  const heroSlug = "موكيت-تركي";
  const hero = productHero(heroSlug);

  return (
    <main>
      <HomeJsonLd />

      {/* ============ الهيرو ============ */}
      <section className="hero-full">
        {hero ? (
          <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="bgimg" />
        ) : null}
        <div className="scrim" />
        <div className="wrap">
          <div className="pin">
            <div className="kick">{business.shortName} · موكيت وأرضيات</div>
            <h1>موكيت وأرضيات تُجمّل مساحتك في {business.address.city}</h1>
            <p>
              موكيت مساجد ومكاتب، موكيت تركي فاخر، عشب صناعي، فينيل، وأرضيات مطاطية — خاماتٌ أصلية مع
              توصيل وتركيب احترافي وخدمة 24 ساعة.
            </p>
            <div className="ctas">
              <Link className="btn btn-accent btn-lg" href="/mokeet">
                تصفّح المنتجات
              </Link>
              <a
                className="btn btn-secondary btn-lg"
                href={whatsappLink("السلام عليكم، أرغب بالاستفسار عن الموكيت والأرضيات")}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,.6)" }}
              >
                <Icon name="whatsapp" /> اطلب عرض سعر
              </a>
            </div>
            <div className="meta">
              <span>أكثر من {products.length} أنواع</span>
              <span>توصيل وتركيب لكل المملكة</span>
              <span>خدمة 24 ساعة</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ شريط الثقة ============ */}
      <section className="sec tight surface">
        <div className="wrap">
          <div className="trust">
            {trust.map(([icon, title, sub]) => (
              <div className="ti" key={title}>
                <div className="ic">
                  <Icon name={icon} />
                </div>
                <div>
                  <b>{title}</b>
                  <span>{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ الأكثر طلبًا ============ */}
      <section className="sec">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="kick">المفضّل لدى عملائنا</div>
              <h2>الأكثر طلبًا</h2>
            </div>
            <Link className="more" href="/mokeet">
              عرض الكل <Icon name="chevLeft" />
            </Link>
          </div>
          <div className="hscroll">
            {bestSlugs.map((slug, i) => (
              <ProductCard
                key={slug}
                slug={slug}
                badge={i === 0 ? "الأكثر طلبًا" : i === 2 ? "جديد" : undefined}
                badgeKind={i === 0 ? "soft" : "new"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ تسوّق حسب النوع ============ */}
      <section className="sec surface">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="kick">لكل مساحة قطعتها</div>
              <h2>تسوّق حسب النوع</h2>
            </div>
            <Link className="more" href="/mokeet">
              كل الأنواع <Icon name="chevLeft" />
            </Link>
          </div>
          <div className="roomgrid pgrid c3">
            {products.map((p) => (
              <Link key={p.slug} href={productPath(p.slug)} className="ccard" aria-label={p.nameAr}>
                <Bg slug={p.slug} sizes="(max-width:560px) 100vw, (max-width:820px) 50vw, 33vw" />
                <div className="scrim" />
                <div className="cap">
                  <div className="t">{p.nameAr}</div>
                  <div className="c">{productImages(p.slug).length} صورة</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ تسوّق حسب المكان ============ */}
      <section className="sec">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="kick">حسب احتياجك</div>
              <h2>تسوّق حسب المكان</h2>
              <p>اختر المكان الذي تريد تجهيزه ونرشّح لك الأنسب — مع توصيل وتركيب احترافي.</p>
            </div>
          </div>
          <div className="budget-band">
            {usageBand.map((u) => (
              <Link key={u.slug} href={productPath(u.slug)} className="budget-card">
                <Bg slug={u.slug} sizes="(max-width:560px) 50vw, 25vw" />
                <div className="scrim" style={{ background: `linear-gradient(to top, ${u.bg}E6, ${u.bg}55)` }} />
                <div className="amt">{u.place}</div>
                <div className="lab">{u.sub}</div>
                <div className="cnt">اعرف المزيد ←</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ إلهام / أدلّة ============ */}
      <section className="sec surface">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="kick">من خبرتنا</div>
              <h2>أدلّة تساعدك على الاختيار</h2>
            </div>
            <Link className="more" href="/blog">
              المدوّنة <Icon name="chevLeft" />
            </Link>
          </div>
          <div className="inspo">
            <Link className="big" href={productPath("موكيت-مساجد")}>
              <Bg slug="موكيت-مساجد" index={1} sizes="(max-width:1100px) 100vw, 60vw" />
              <div className="scrim" />
              <div>
                <h3>كيف تختار موكيت المساجد المناسب؟</h3>
                <p>دليل سريع للكثافة والمقاومة للحريق وخطوط السجود وألوان المصلّى.</p>
                <span className="btn btn-accent">اقرأ الدليل</span>
              </div>
            </Link>
            <div className="col">
              <Link className="mini" href={productPath("عشب-صناعي")}>
                <Bg slug="عشب-صناعي" sizes="(max-width:1100px) 50vw, 20vw" />
                <div className="scrim" />
                <h4>عشب صناعي للأسطح</h4>
              </Link>
              <Link className="mini" href={productPath("فينيل")}>
                <Bg slug="فينيل" sizes="(max-width:1100px) 50vw, 20vw" />
                <div className="scrim" />
                <h4>فينيل ضد الماء</h4>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ عروض لفترة محدودة ============ */}
      <section className="sec">
        <div className="wrap">
          <div className="offers-band">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                flexWrap: "wrap",
                marginBottom: 22,
              }}
            >
              <div>
                <div className="kick" style={{ color: "#fff", opacity: 0.85 }}>
                  عرض ينتهي قريبًا
                </div>
                <h2 style={{ fontSize: 30, color: "#fff" }}>أسعار خاصة لفترة محدودة</h2>
              </div>
              <Countdown />
            </div>
            <div className="pgrid c4" style={{ ["--c-bg" as string]: "#fff" }}>
              {offersSlugs.map((slug) => (
                <ProductCard key={slug} slug={slug} badge="عرض" badgeKind="soft" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ تسوّق حسب الاستخدام (ستايل) ============ */}
      <section className="sec surface">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="kick">حسب المكان</div>
              <h2>تسوّق حسب الاستخدام</h2>
            </div>
          </div>
          <div className="style-grid">
            {styleTiles.map((s) => (
              <Link key={s.t} href={productPath(s.slug)} className="style-tile">
                <Bg slug={s.slug} sizes="(max-width:560px) 100vw, (max-width:1100px) 50vw, 33vw" />
                <div className="scrim" />
                <div>
                  <div className="t">{s.t}</div>
                  <div className="c">{s.c}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ بانر ترويجي ============ */}
      <section className="sec">
        <div className="wrap">
          <div className="promo-banner">
            <Bg slug="موكيت-تركي" index={2} sizes="100vw" />
            <div className="scrim" />
            <div className="pin">
              <div className="kick" style={{ color: "#fff", opacity: 0.85 }}>
                عملاء جدد
              </div>
              <h2>استشارة مجانية لاختيار الأنسب لمساحتك</h2>
              <p>تواصل معنا عبر واتساب أو الهاتف ونساعدك في اختيار النوع والمقاس مع عرض سعر فوري.</p>
              <a
                className="btn btn-accent btn-lg"
                href={whatsappLink("السلام عليكم، أرغب باستشارة وعرض سعر")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" /> تواصل واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ تواصل / عرض سعر ============ */}
      <section className="sec">
        <div className="wrap">
          <div className="news">
            <div>
              <h2>هل تحتاج عرض سعر أو استشارة؟</h2>
              <p>راسلنا على واتساب أو اتصل بنا مباشرة — خدمة 24 ساعة في {business.address.city} وكل المملكة.</p>
            </div>
            <div>
              <div className="form" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a
                  className="btn btn-accent btn-lg"
                  href={whatsappLink("السلام عليكم، أرغب بعرض سعر")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" /> اطلب عبر واتساب
                </a>
                <a className="btn btn-secondary btn-lg" href={telLink} dir="ltr">
                  <Icon name="phone" /> {business.phone.display}
                </a>
              </div>
              <div className="fine">{business.hours.label} · {business.address.full}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
