import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { business, whatsappLink } from "@/lib/data/business";
import { ThemeToggle } from "./ThemeToggle";
import { MobileDrawer } from "./MobileDrawer";
import { CategoryList } from "./MegaMenu";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "المدوّنة", href: "/blog" },
  { label: "من نحن", href: "/about" },
  { label: "تواصل", href: "/contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="shrink-0 leading-none">
          <span className="font-display text-2xl font-bold text-text">{business.shortName}</span>
          <span className="block text-[9px] font-semibold uppercase tracking-[0.28em] text-muted">
            موكيت · أرضيات
          </span>
        </Link>

        {/* تنقّل سطح المكتب */}
        <nav aria-label="التنقّل الرئيسي" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {/* قائمة كبرى (تصميم C) — تظهر بالـ CSS عند المرور/التركيز، فتبقى الروابط في DOM للزحف */}
            <li className="group relative">
              <Link
                href="/mokeet"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-semibold text-text hover:bg-surface"
              >
                السجاد والأرضيات
                <Icon name="chevDown" className="size-4 opacity-70 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute start-0 top-full z-50 w-[min(640px,88vw)] pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-2xl border border-border bg-bg p-4 shadow-lg">
                  <CategoryList />
                </div>
              </div>
            </li>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-2 text-[15px] font-semibold text-text hover:bg-surface"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* أدوات */}
        <div className="ms-auto flex items-center gap-1">
          <Link
            href="/mokeet"
            aria-label="بحث في المنتجات"
            className="grid size-11 place-items-center rounded-xl text-text hover:bg-surface"
          >
            <Icon name="search" className="size-5" />
          </Link>
          <ThemeToggle />
          <Button href={whatsappLink()} variant="accent" size="sm" className="hidden lg:inline-flex">
            <Icon name="whatsapp" /> تواصل واتساب
          </Button>
          <MobileDrawer />
        </div>
      </div>
    </header>
  );
}
