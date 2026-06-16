import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { products, productPath } from "@/lib/data/products";

/** قائمة المنتجات (الأنواع التسعة) — تُستخدم في القائمة الكبرى (hover) والدرج.
   كلها روابط <a> حقيقية قابلة للزحف لصفحات المنتجات (/p/<slug>). */
export function ProductsMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="grid gap-1.5 sm:grid-cols-2">
      {products.map((p) => (
        <li key={p.slug}>
          <Link
            href={productPath(p.slug)}
            onClick={onNavigate}
            className="group/item flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[var(--c-surface)]"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[var(--c-surface)] text-[var(--c-primary)] transition-colors group-hover/item:bg-[var(--c-bg)]">
              <Icon name={p.icon} className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-[var(--c-text)]">{p.nameAr}</span>
              <span className="block truncate text-xs text-[var(--c-muted)]">{p.blurb}</span>
            </span>
            <Icon name="chevLeft" className="size-4 shrink-0 text-[var(--c-muted)]" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
