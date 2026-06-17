import { cn } from "@/lib/utils/cn";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8Z" />
    </svg>
  );
}

/** صف نجوم (0–5). */
export function Stars({ value, className }: { value: number; className?: string }) {
  const rounded = Math.round(value);
  return (
    <span className={cn("inline-flex gap-0.5 text-star", className)} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= rounded} />
      ))}
    </span>
  );
}

/** تقييم: الدرجة + النجوم + عدد المراجعات (مع نص بديل لقارئ الشاشة). */
export function Rating({
  value,
  count,
  showScore = true,
  className,
}: {
  value: number;
  count?: number;
  showScore?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="sr-only">
        التقييم {value.toFixed(1)} من 5{count != null ? `، ${count} مراجعة` : ""}
      </span>
      {showScore && (
        <span className="text-[13px] font-bold text-text" aria-hidden="true">
          {value.toFixed(1)}
        </span>
      )}
      <Stars value={value} />
      {count != null && (
        <span className="text-[12.5px] text-muted" aria-hidden="true">
          ({count})
        </span>
      )}
    </span>
  );
}
