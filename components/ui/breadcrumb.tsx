import { cn } from "@/lib/utils/cn";
import { Icon } from "./icon";

export interface Crumb {
  label: string;
  href?: string;
}

/** مسار تنقّل دلالي (<nav><ol>) — روابط حقيقية، آخر عنصر هو الحالي.
   يُقرَن غالبًا بـ BreadcrumbList JSON-LD في صفحات المنتج/التصنيف. */
export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="مسار التنقّل" className={cn("text-[13px] text-muted", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !last ? (
                <a href={item.href} className="transition-colors hover:text-text">
                  {item.label}
                </a>
              ) : (
                <span className={cn(last && "font-semibold text-text")} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && <Icon name="chevLeft" className="size-[15px] opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
