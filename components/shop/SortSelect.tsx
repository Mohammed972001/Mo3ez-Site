"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";

/** ترتيب المتجر — يحدّث حالة الـ URL (?sort=) فيقرأها الخادم ويعيد الترتيب (SEO-friendly). */
export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const current = sp.get("sort") ?? "featured";

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(sp.toString());
    if (e.target.value === "featured") params.delete("sort");
    else params.set("sort", e.target.value);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="select-wrap">
      <select className="input" value={current} onChange={onChange} aria-label="ترتيب المنتجات">
        <option value="featured">مميّز</option>
        <option value="name">الاسم (أ–ي)</option>
      </select>
      <Icon name="chevDown" />
    </div>
  );
}
