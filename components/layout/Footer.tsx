import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { business, telLink, whatsappLink } from "@/lib/data/business";
import { categories, categoryPath } from "@/lib/data/categories";

const helpLinks = [
  { label: "تواصل معنا", href: "/contact" },
  { label: "من نحن", href: "/about" },
  { label: "المدوّنة", href: "/blog" },
  { label: "الشحن والتركيب", href: "/contact" },
];

const payments = ["مدى", "Visa", "Mastercard", "Apple Pay", "تابي", "تمارا"];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted">{title}</h2>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-sm text-text transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-bold text-text">{business.name}</p>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">
              موكيت ومفروشات وأرضيات في {business.address.city} — موكيت مساجد ومكاتب، عشب صناعي،
              فينيل، وأرضيات مطاطية، مع توصيل وتركيب احترافي.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href={telLink} dir="ltr" className="flex items-center gap-2 text-text hover:text-accent">
                <Icon name="phone" className="size-4" /> {business.phone.display}
              </a>
              <a href={whatsappLink()} className="flex items-center gap-2 text-text hover:text-accent">
                <Icon name="whatsapp" className="size-4" /> واتساب
              </a>
              <span className="flex items-center gap-2 text-muted">
                <Icon name="location" className="size-4" /> {business.address.full}
              </span>
            </div>
          </div>

          <Column
            title="التصنيفات"
            links={categories.slice(0, 6).map((c) => ({ label: c.nameAr, href: categoryPath(c.slug) }))}
          />
          <Column title="روابط" links={helpLinks} />

          <div>
            <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted">ساعات العمل</h2>
            <p className="text-sm text-text">{business.hours.label}</p>
            <h2 className="mb-3 mt-6 text-[11px] font-bold uppercase tracking-[0.1em] text-muted">طرق الدفع</h2>
            <ul className="flex flex-wrap gap-1.5">
              {payments.map((p) => (
                <li
                  key={p}
                  className="rounded-md border border-border bg-bg px-2 py-1 text-[10px] font-bold text-muted"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} {business.name} — جميع الحقوق محفوظة · الأسعار شاملة ضريبة القيمة المضافة
        </div>
      </div>
    </footer>
  );
}
