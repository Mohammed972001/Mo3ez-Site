import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ProductCard } from "@/components/home/ProductCard";
import { SortSelect } from "@/components/shop/SortSelect";
import { business } from "@/lib/data/business";
import { products, productsByCategory, categories, categoryCount, productPath } from "@/lib/data/products";

const SITE_URL = "https://www.mokeet-elsuarye.com";

export const metadata: Metadata = {
  title: `كل المنتجات | موكيت وأرضيات وعشب صناعي وفينيل — ${business.name}`,
  description:
    "تصفّح كل أنواع الموكيت والأرضيات في الرياض: موكيت مساجد ومكاتب، موكيت تركي، عشب صناعي، فينيل، وأرضيات مطاطية للجيم والخيول والحمامات. السعر عند الطلب — اطلب عرض سعر عبر واتساب.",
  keywords: ["موكيت", "أرضيات", "موكيت الرياض", "عشب صناعي", "فينيل", "أرضيات مطاطية", "موكيت مساجد", "موكيت مكاتب"],
  alternates: { canonical: "/mokeet" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: business.name,
    title: `كل المنتجات — موكيت وأرضيات في ${business.address.city}`,
    url: `${SITE_URL}/mokeet`,
  },
};

type SP = { cat?: string; sort?: string };

export default async function ShopPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const activeCat = categories.find((c) => c.slug === sp.cat);
  let list = productsByCategory(activeCat?.slug);
  if (sp.sort === "name") list = [...list].sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar"));

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: activeCat ? `${activeCat.label} — ${business.name}` : `كل المنتجات — ${business.name}`,
    itemListElement: list.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}${productPath(p.slug)}`,
      name: p.nameAr,
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <section className="sec" style={{ paddingBlock: 28 }}>
        <div className="wrap">
          <nav className="crumbs" style={{ marginBottom: 8 }} aria-label="مسار التصفّح">
            <Link href="/">الرئيسية</Link>
            <Icon name="chevLeft" className="sep" />
            <span className="cur">المنتجات</span>
          </nav>

          <h1 style={{ fontSize: 32 }}>
            {activeCat ? activeCat.label : "كل المنتجات"} — موكيت وأرضيات في {business.address.city}
          </h1>
          <p className="shop-intro">
            تشكيلة {business.name} من الموكيت والأرضيات: موكيت مساجد ومكاتب، موكيت تركي فاخر، عشب صناعي،
            فينيل، وأرضيات مطاطية. الأسعار عند الطلب مع توصيل وتركيب احترافي وخدمة 24 ساعة في{" "}
            {business.address.city} وكل المملكة.
          </p>

          {/* شريط الفلاتر (تصميم B) — فلتر الفئة عبر روابط تُحدّث الـ URL */}
          <div className="filterbar">
            <details className="fdrop">
              <summary>
                الفئة <Icon name="chevDown" />
              </summary>
              <div className="pop">
                <Link href="/mokeet" className={!activeCat ? "on" : ""}>
                  <span>الكل</span>
                  <span className="c">{products.length}</span>
                </Link>
                {categories.map((c) => (
                  <Link key={c.slug} href={`/mokeet?cat=${c.slug}`} className={activeCat?.slug === c.slug ? "on" : ""}>
                    <span>{c.label}</span>
                    <span className="c">{categoryCount(c.slug)}</span>
                  </Link>
                ))}
              </div>
            </details>
            <span className="spacer" />
          </div>

          {/* شريحة الفلتر النشط (قابلة للإزالة) */}
          {activeCat ? (
            <div className="chips" style={{ marginBottom: 14 }}>
              <Link href="/mokeet" className="chip removable active">
                {activeCat.label}
                <Icon name="x" className="x" />
              </Link>
            </div>
          ) : null}

          {/* الأدوات: العدد + الترتيب */}
          <div className="toolbar">
            <span className="count">
              عرض <b>{list.length}</b> من <b>{products.length}</b> منتج
            </span>
            <div className="sortwrap">
              <span>ترتيب حسب</span>
              <SortSelect />
            </div>
          </div>

          {list.length ? (
            <div className="pgrid c4">
              {list.map((p) => (
                <ProductCard key={p.slug} slug={p.slug} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h4>لا توجد منتجات في هذه الفئة</h4>
              <p>جرّب فئة أخرى أو تصفّح كل المنتجات.</p>
              <Link className="btn btn-primary" href="/mokeet">
                كل المنتجات
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
