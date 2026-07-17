import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { whatsappLink } from "@/lib/data/business";
import { categorySeo, categoryPath } from "@/lib/data/categories";

/* Global 404 (spec 002, T018) — a real HTTP 404 (never a soft-404),
   with helpful Arabic links back into the catalog. */
export default function NotFound() {
  return (
    <main>
      <section className="sec">
        <div className="wrap">
          <div className="empty" style={{ maxWidth: 560, margin: "0 auto" }}>
            <div className="ill">
              <Icon name="search" />
            </div>
            <h1 style={{ fontSize: 26 }}>الصفحة غير موجودة</h1>
            <p>يبدو أن الرابط غير صحيح أو أن الصفحة نُقلت. جرّب أحد الأقسام التالية:</p>
            <div className="chips" style={{ justifyContent: "center", marginBlock: 14 }}>
              {categorySeo.map((c) => (
                <Link key={c.slug} href={categoryPath(c.slug)} className="chip">
                  {c.label}
                </Link>
              ))}
              <Link href="/services/tarkeeb" className="chip">
                خدمة التركيب
              </Link>
            </div>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn-primary" href="/">
                الرئيسية
              </Link>
              <a
                className="btn btn-accent"
                href={whatsappLink("السلام عليكم، أبحث عن منتج ولم أجد الصفحة")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" /> اسألنا واتساب
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
