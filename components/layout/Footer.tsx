import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { business, telLink, whatsappLink } from "@/lib/data/business";
import { products, productPath } from "@/lib/data/products";

const helpLinks = [
  { label: "تواصل معنا", href: "/contact" },
  { label: "من نحن", href: "/about" },
  { label: "المدوّنة", href: "/blog" },
  { label: "كل المنتجات", href: "/mokeet" },
];

const payments = ["مدى", "Visa", "Mastercard", "Apple Pay", "تابي", "تمارا"];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h5>{title}</h5>
      {links.map((l) => (
        <Link key={l.href + l.label} className="fl" href={l.href}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

/** فوتر المتجر (.foot من نظام التصميم) — كامل العرض، NAP موحّد، روابط داخلية للمنتجات. */
export function Footer() {
  return (
    <footer className="foot mt-auto rounded-none border-x-0 border-b-0">
      <div className="wrap" style={{ padding: 0 }}>
        <div className="top">
          <div>
            <div className="logo">{business.name}</div>
            <p className="desc">
              موكيت ومفروشات وأرضيات في {business.address.city} — موكيت مساجد ومكاتب، عشب صناعي، فينيل،
              وأرضيات مطاطية، مع توصيل وتركيب احترافي.
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href={telLink} dir="ltr" className="flex items-center gap-2 hover:text-[var(--c-accent)]">
                <Icon name="phone" className="size-4" /> {business.phone.display}
              </a>
              <a href={whatsappLink()} className="flex items-center gap-2 hover:text-[var(--c-accent)]">
                <Icon name="whatsapp" className="size-4" /> واتساب
              </a>
              <span className="flex items-center gap-2 text-[var(--c-muted)]">
                <Icon name="location" className="size-4" /> {business.address.full}
              </span>
            </div>
          </div>

          <Column
            title="المنتجات"
            links={products.slice(0, 6).map((p) => ({ label: p.nameAr, href: productPath(p.slug) }))}
          />
          <Column title="روابط" links={helpLinks} />

          <div>
            <h5>ساعات العمل</h5>
            <p className="text-sm">{business.hours.label}</p>
            <h5 className="mt-5">طرق الدفع</h5>
            <div className="pay">
              {payments.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom">
          <span>
            © {new Date().getFullYear()} {business.name} — جميع الحقوق محفوظة · الأسعار شاملة ضريبة القيمة المضافة
          </span>
          <div className="social">
            <a href={whatsappLink()} aria-label="واتساب">
              <Icon name="whatsapp" />
            </a>
            <a href={telLink} aria-label="اتصال">
              <Icon name="phone" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
