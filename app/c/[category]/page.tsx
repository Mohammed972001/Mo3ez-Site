import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { ProductCard } from "@/components/home/ProductCard";
import { business, whatsappLink, telLink } from "@/lib/data/business";
import { productsByCategory, productPath } from "@/lib/data/products";
import { categorySeo, getCategorySeo, categoryPath } from "@/lib/data/categories";
import { allPosts, postPath } from "@/lib/blog/posts";
import { SITE_URL } from "@/lib/seo/site";

/* Dedicated category landing pages (spec 002, US5): one clean, indexable,
   keyword-targeted URL per category — owns the umbrella commercial query,
   while product pages keep the fine-grained intents. */

type Params = { category: string };

export function generateStaticParams() {
  return categorySeo.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategorySeo(decodeURIComponent(category));
  if (!cat) return {};
  return {
    title: `${cat.title} — ${business.name}`,
    description: cat.metaDescription,
    keywords: [cat.keyword, cat.label, `${cat.label} الرياض`],
    alternates: { canonical: categoryPath(cat.slug) },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      siteName: business.name,
      title: cat.h1,
      description: cat.metaDescription,
      url: `${SITE_URL}${categoryPath(cat.slug)}`,
    },
  };
}

function fmtUpdated(iso: string) {
  return new Date(iso).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = getCategorySeo(decodeURIComponent(category));
  if (!cat) notFound();

  const list = productsByCategory(cat.slug);
  const siblings = categorySeo.filter((c) => c.slug !== cat.slug);
  const relatedPosts = allPosts().filter((p) =>
    p.links?.some((l) => l.href === categoryPath(cat.slug)),
  );
  const wa = whatsappLink(`السلام عليكم، أرغب بعرض سعر — ${cat.label}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "المنتجات", item: `${SITE_URL}/mokeet` },
          { "@type": "ListItem", position: 3, name: cat.label },
        ],
      },
      {
        "@type": "ItemList",
        name: `${cat.label} — ${business.name}`,
        itemListElement: list.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${productPath(p.slug)}`,
          name: p.nameAr,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: cat.faqs.map((f) => ({
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
            <Link href="/mokeet">المنتجات</Link>
            <Icon name="chevLeft" className="sep" />
            <span className="cur">{cat.label}</span>
          </nav>

          <h1 style={{ fontSize: 32 }}>{cat.h1}</h1>

          {/* GEO: direct-answer block first, with a visible last-updated date */}
          <p className="shop-intro">{cat.intro}</p>
          <p className="cat-updated">
            <Icon name="check" /> آخر تحديث: <time dateTime={cat.updated}>{fmtUpdated(cat.updated)}</time>
          </p>

          <div className="cta-row" style={{ marginBlock: 18 }}>
            <a className="btn btn-accent" href={wa} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /> اطلب عرض سعر واتساب
            </a>
            <a className="btn btn-secondary" href={telLink} dir="ltr">
              <Icon name="phone" /> {business.phone.display}
            </a>
          </div>

          <div className="toolbar">
            <span className="count">
              <b>{list.length}</b> منتجات في {cat.label}
            </span>
          </div>

          <div className="pgrid c4">
            {list.map((p, i) => (
              <ProductCard key={p.slug} slug={p.slug} priority={i === 0} />
            ))}
          </div>

          {/* Unique category copy (quality bar: researched, not templated) */}
          <section style={{ marginTop: 40 }} aria-labelledby="cat-about-h">
            <div className="s-head">
              <div>
                <div className="kick">دليلك السريع</div>
                <h2 id="cat-about-h">كيف تختار {cat.label} المناسب؟</h2>
              </div>
            </div>
            <p className="pdesc">{cat.body}</p>
          </section>

          {/* Category FAQ — visible section (SEO/GEO) */}
          <section style={{ marginTop: 40 }} aria-labelledby="cat-faq-h">
            <div className="s-head">
              <div>
                <div className="kick">يسألنا العملاء</div>
                <h2 id="cat-faq-h">أسئلة شائعة عن {cat.label}</h2>
              </div>
            </div>
            <div className="faq-list">
              {cat.faqs.map((f) => (
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

          {/* Related articles (topic cluster) */}
          {relatedPosts.length ? (
            <section style={{ marginTop: 40 }} aria-labelledby="cat-posts-h">
              <div className="s-head">
                <div>
                  <div className="kick">من المدوّنة</div>
                  <h2 id="cat-posts-h">أدلّة قد تفيدك</h2>
                </div>
                <Link className="more" href="/blog">
                  كل المقالات <Icon name="chevLeft" />
                </Link>
              </div>
              <div className="chips">
                {relatedPosts.map((p) => (
                  <Link key={p.slug} href={postPath(p.slug)} className="chip">
                    {p.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {/* Cross-links to sibling categories (hub-and-spoke) */}
          <section style={{ marginTop: 40 }} aria-labelledby="cat-more-h">
            <div className="s-head">
              <div>
                <div className="kick">تصفّح أيضًا</div>
                <h2 id="cat-more-h">أقسام أخرى</h2>
              </div>
              <Link className="more" href="/mokeet">
                كل المنتجات <Icon name="chevLeft" />
              </Link>
            </div>
            <div className="chips">
              {siblings.map((s) => (
                <Link key={s.slug} href={categoryPath(s.slug)} className="chip">
                  {s.label}
                </Link>
              ))}
              <Link href="/services/tarkeeb" className="chip active">
                خدمة التركيب بالرياض
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
