"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** زر تبديل الوضع الفاتح/الداكن — يعدّل data-theme على <html> ويحفظ الاختيار. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // نقرأ الوضع الفعلي بعد الترطيب (سكربت الـ no-flash ضبطه قبل الرسم).
  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "light";
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* تجاهل تعذّر التخزين */
    }
    setTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
      aria-pressed={isDark}
      className="grid size-11 place-items-center rounded-xl border border-border text-text transition-colors hover:bg-surface"
    >
      {/* أيقونة واحدة تكفي؛ نخفي البديل بصريًّا. نتجنّب وميض SSR بعدم الرسم قبل معرفة الوضع. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
        aria-hidden="true"
      >
        {isDark ? (
          // شمس (تظهر في الوضع الداكن للتبديل للفاتح)
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          // قمر (تظهر في الوضع الفاتح للتبديل للداكن)
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        )}
      </svg>
    </button>
  );
}
