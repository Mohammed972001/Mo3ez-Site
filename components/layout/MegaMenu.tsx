import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { categories, categoryPath } from "@/lib/data/categories";

/** قائمة التصنيفات (تصميم C المدمج) — تُستخدم في القائمة الكبرى (hover) والدرج.
   كلها روابط <a> حقيقية قابلة للزحف (المادة 1). */
export function CategoryList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="grid gap-1.5 sm:grid-cols-2">
      {categories.map((c) => (
        <li key={c.slug}>
          <Link
            href={categoryPath(c.slug)}
            onClick={onNavigate}
            className="group/item flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-primary transition-colors group-hover/item:bg-bg">
              <Icon name={c.icon} className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-text">{c.nameAr}</span>
              <span className="block truncate text-xs text-muted">{c.blurb}</span>
            </span>
            <Icon name="chevLeft" className="size-4 shrink-0 text-muted" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
