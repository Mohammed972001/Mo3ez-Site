"use client";

/** زر تبديل الوضع الفاتح/الداكن.
   بلا حالة React: الأيقونة تنقلب بالـ CSS حسب [data-theme] (يضبطه سكربت no-flash
   قبل الترطيب → بلا عدم تطابق)، والنقر يقرأ الوضع الحالي من DOM ويبدّله. */
export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.dataset.theme === "dark";
    const next = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* تجاهل تعذّر التخزين */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="تبديل الوضع الفاتح/الداكن"
      className="grid size-11 place-items-center rounded-xl border border-border text-text transition-colors hover:bg-surface"
    >
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
        {/* قمر — يظهر في الوضع الفاتح (للتبديل للداكن) */}
        <path className="block dark:hidden" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        {/* شمس — تظهر في الوضع الداكن (للتبديل للفاتح) */}
        <g className="hidden dark:block">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </g>
      </svg>
    </button>
  );
}
