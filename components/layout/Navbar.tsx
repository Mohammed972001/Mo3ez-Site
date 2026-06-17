import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { business, whatsappLink } from "@/lib/data/business";
import { ThemeToggle } from "./ThemeToggle";
import { MobileDrawer } from "./MobileDrawer";
import { ProductsMenu } from "./MegaMenu";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "المدوّنة", href: "/blog" },
  { label: "من نحن", href: "/about" },
  { label: "تواصل", href: "/contact" },
];

/** نافبار المتجر (.snav من نظام التصميم) — لوجو + روابط + قائمة منتجات كبرى + أدوات.
   القائمة تظهر بالـ CSS فتبقى روابط المنتجات في DOM للزحف. واتساب بدل السلة (lead-gen). */
export function Navbar() {
  return (
    <nav className="snav">
      <div className="wrap">
        <div className="row">
          <Link className="logo" href="/">
            {business.shortName}
            <small>موكيت · أرضيات</small>
          </Link>

          <div className="links max-lg:hidden">
            <Link href="/">الرئيسية</Link>

            {/* قائمة كبرى — تظهر بالـ CSS عند المرور/التركيز */}
            <div className="group relative">
              <Link href="/mokeet" className="flex items-center gap-1.5">
                المنتجات
                <Icon name="chevDown" className="size-4 opacity-70 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute start-0 top-full z-50 w-[min(620px,86vw)] pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-bg)] p-4 shadow-[var(--sh-lg)]">
                  <ProductsMenu />
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="tools">
            <Link href="/mokeet" className="icon-btn" aria-label="بحث في المنتجات">
              <Icon name="search" />
            </Link>
            <ThemeToggle />
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-wa btn btn-accent btn-sm"
            >
              <Icon name="whatsapp" /> تواصل واتساب
            </a>
            <MobileDrawer />
          </div>
        </div>
      </div>
    </nav>
  );
}
