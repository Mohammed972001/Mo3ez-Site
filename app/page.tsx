import { ThemeToggle } from "@/components/layout/ThemeToggle";

// صفحة مؤقتة — تعرض نظام الثيم (T01). الرئيسية الحقيقية (تصميم A) في T07.
export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-24">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-ink">
          نظام الثيم · Type 3
        </span>
        <ThemeToggle />
      </div>

      <h1 className="text-4xl font-bold text-text">موكيت وأرضيات الرياض</h1>
      <p className="text-base text-muted">
        الأساس والثيم جاهزان (T01): لوحة Warm Artisan للوضع الفاتح، Dark Premium
        للداكن، وخطوط Fraunces + ريم كوفي للعناوين، Sora + Cairo للنص.
      </p>

      <div className="flex flex-wrap gap-3">
        <button className="rounded-xl bg-primary px-5 py-3 font-semibold text-on-primary">
          زر أساسي
        </button>
        <button className="rounded-xl bg-accent px-5 py-3 font-semibold text-on-accent">
          زر مميّز
        </button>
        <span className="rounded-xl border border-border bg-surface px-5 py-3 font-semibold text-text">
          سطح
        </span>
      </div>
    </main>
  );
}
