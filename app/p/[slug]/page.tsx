import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/icon";
import { Gallery } from "@/components/product/Gallery";
import { Tabs } from "@/components/product/Tabs";
import { ProductCard } from "@/components/home/ProductCard";
import { business, whatsappLink, telLink } from "@/lib/data/business";
import {
  products,
  getProduct,
  productImages,
  productPath,
  categories,
} from "@/lib/data/products";

const SITE_URL = "https://www.mokeet-elsuarye.com";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(decodeURIComponent(slug));
  if (!p) return {};
  return {
    title: `${p.nameAr} | ${business.name} — ${business.address.city}`,
    description: p.intro,
    keywords: p.keywords,
    alternates: { canonical: productPath(p.slug) },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      siteName: business.name,
      title: `${p.nameAr} — ${business.name}`,
      description: p.intro,
      url: `${SITE_URL}${productPath(p.slug)}`,
      images: productImages(p.slug)[0]?.src ? [`${SITE_URL}${productImages(p.slug)[0].src}`] : undefined,
    },
  };
}

const trustMini: [IconName, string, string][] = [
  ["truck", "توصيل وتركيب", "لكل مدن المملكة"],
  ["shield", "ضمان على الجودة", "خامات أصلية تدوم"],
  ["phone", "خدمة 24 ساعة", "تواصل في أي وقت"],
  ["star", "استشارة مجانية", "نساعدك في الاختيار"],
];

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const product = getProduct(decoded);
  if (!product) notFound();

  const images = productImages(product.slug);
  const catLabel = categories.find((c) => c.slug === product.category)?.label ?? "المنتجات";
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);
  const wa = whatsappLink(`السلام عليكم، أرغب بعرض سعر وتفاصيل عن ${product.nameAr}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.nameAr,
        description: product.intro,
        image: images.slice(0, 6).map((i) => `${SITE_URL}${i.src}`),
        brand: { "@type": "Brand", name: business.name },
        category: catLabel,
        url: `${SITE_URL}${productPath(product.slug)}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "المنتجات", item: `${SITE_URL}/mokeet` },
          { "@type": "ListItem", position: 3, name: catLabel, item: `${SITE_URL}/mokeet?cat=${product.category}` },
          { "@type": "ListItem", position: 4, name: product.nameAr },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: product.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="has-pbar">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="sec" style={{ paddingBlock: 26 }}>
        <div className="wrap">
          <nav className="crumbs" style={{ marginBottom: 20 }} aria-label="مسار التصفّح">
            <Link href="/">الرئيسية</Link>
            <Icon name="chevLeft" className="sep" />
            <Link href="/mokeet">المنتجات</Link>
            <Icon name="chevLeft" className="sep" />
            <Link href={`/mokeet?cat=${product.category}`}>{catLabel}</Link>
            <Icon name="chevLeft" className="sep" />
            <span className="cur">{product.nameAr}</span>
          </nav>

          <div className="pdp-2col classic">
            <Gallery images={images} name={product.nameAr} />

            <div className="buy">
              <span className="eyebrow">{catLabel}</span>
              <h1>{product.nameAr}</h1>
              <div className="topline">
                <span className="badge badge-soft badge-dot">{images.length} صورة</span>
                <span className="badge badge-new">{product.tagline}</span>
              </div>
              <p className="lead">{product.intro}</p>

              <ul className="features">
                {product.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" /> {f}
                  </li>
                ))}
              </ul>

              <div className="cta-row">
                <a className="btn btn-accent btn-lg" href={wa} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" /> اطلب عرض سعر واتساب
                </a>
                <a className="btn btn-secondary btn-lg" href={telLink} dir="ltr">
                  <Icon name="phone" /> {business.phone.display}
                </a>
              </div>

              <div className="stock">
                <span className="it ok">
                  <Icon name="check" /> متوفّر — السعر عند الطلب
                </span>
                <span className="it">
                  <Icon name="truck" /> توصيل وتركيب احترافي
                </span>
              </div>

              <div className="trust-mini">
                {trustMini.map(([icon, b, s]) => (
                  <div className="ti" key={b}>
                    <div className="ic">
                      <Icon name={icon} />
                    </div>
                    <div>
                      <b>{b}</b>
                      <span>{s}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* التبويبات: الوصف · المواصفات · الأسئلة الشائعة */}
          <div style={{ marginTop: 48 }}>
            <Tabs
              tabs={[
                {
                  key: "desc",
                  label: "الوصف",
                  content: (
                    <>
                      <p className="pdesc">{product.description}</p>
                      <ul className="features" style={{ marginTop: 16 }}>
                        {product.features.map((f) => (
                          <li key={f}>
                            <Icon name="check" /> {f}
                          </li>
                        ))}
                      </ul>
                    </>
                  ),
                },
                {
                  key: "specs",
                  label: "المواصفات",
                  content: (
                    <div className="specs">
                      {product.specs.map((s) => (
                        <div className="sp" key={s.k}>
                          <span className="k">{s.k}</span>
                          <span className="v">{s.v}</span>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  key: "faq",
                  label: `الأسئلة الشائعة (${product.faq.length})`,
                  content: (
                    <div className="faq-list">
                      {product.faq.map((f) => (
                        <div className="faq-item" key={f.q}>
                          <h4>{f.q}</h4>
                          <p>{f.a}</p>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* منتجات مرتبطة */}
          <div style={{ marginTop: 48 }}>
            <div className="s-head">
              <div>
                <div className="kick">قد يعجبك أيضًا</div>
                <h2>منتجات أخرى</h2>
              </div>
              <Link className="more" href="/mokeet">
                عرض الكل <Icon name="chevLeft" />
              </Link>
            </div>
            <div className="pgrid c4">
              {related.map((p) => (
                <ProductCard key={p.slug} slug={p.slug} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* شريط ثابت للجوال */}
      <div className="pbar">
        <a className="btn btn-accent" href={wa} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" /> عرض سعر
        </a>
        <a className="btn btn-secondary" href={telLink} dir="ltr">
          <Icon name="phone" /> اتصال
        </a>
      </div>
    </main>
  );
}
