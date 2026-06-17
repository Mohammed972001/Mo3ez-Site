import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeVariant = "sale" | "new" | "low" | "soft";

const variants: Record<BadgeVariant, string> = {
  sale: "bg-sale text-white",
  new: "bg-primary text-on-primary",
  low: "bg-accent/15 text-accent border border-accent/40",
  soft: "bg-surface text-text border border-border",
};

/** شارة منتج (تخفيض/جديد/محدود/ناعمة). */
export function Badge({
  variant = "soft",
  dot = false,
  children,
  className,
}: {
  variant?: BadgeVariant;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[7px] px-2.5 py-1.5 text-[11px] font-bold leading-none",
        variants[variant],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
