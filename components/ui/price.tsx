import { cn } from "@/lib/utils/cn";

const SAR = <span className="text-[0.72em] font-semibold opacity-85">ر.س</span>;

/** تنسيق رقم بفواصل آلاف (أرقام غربية). */
function fmt(n: number) {
  return n.toLocaleString("en-US");
}

/** كتلة السعر — السعر الحالي + (سعر قبل الخصم + نسبة الخصم) اختياريًّا. */
export function Price({
  price,
  was,
  size = "md",
  className,
}: {
  price: number;
  was?: number;
  size?: "md" | "lg";
  className?: string;
}) {
  const off = was ? Math.round((1 - price / was) * 100) : 0;
  const onSale = Boolean(was);

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2.5 gap-y-1", className)}>
      <span
        className={cn(
          "font-bold tnum",
          size === "lg" ? "text-3xl" : "text-xl",
          onSale ? "text-sale" : "text-text",
        )}
      >
        {fmt(price)} {SAR}
      </span>
      {was && (
        <>
          <span className="text-sm text-muted line-through decoration-[1.5px] tnum">
            {fmt(was)} {SAR}
          </span>
          <span className="rounded-md bg-sale px-1.5 py-0.5 text-[11.5px] font-bold text-white">
            −{off}%
          </span>
        </>
      )}
    </span>
  );
}
