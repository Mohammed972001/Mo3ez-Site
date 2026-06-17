import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon, type IconName } from "./icon";

/** هيكل تحميل (يحجز المساحة → CLS=0). الحركة تتوقّف مع prefers-reduced-motion. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-surface", className)} />;
}

/** هيكل بطاقة منتج. */
export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg">
      <Skeleton className="aspect-[4/5] rounded-none" />
      <div className="flex flex-col gap-2.5 p-3.5">
        <Skeleton className="h-3 w-3/5" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-[18px] w-2/5" />
      </div>
    </div>
  );
}

/** حالة فراغ/خطأ — أيقونة + عنوان + وصف + إجراء اختياري. */
export function Empty({
  icon = "info",
  title,
  description,
  action,
  tone = "muted",
}: {
  icon?: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "muted" | "error";
}) {
  return (
    <div className="px-6 py-10 text-center">
      <div
        className={cn(
          "mx-auto mb-4 grid size-20 place-items-center rounded-full bg-surface",
          tone === "error" ? "text-sale" : "text-muted",
        )}
      >
        <Icon name={icon} className="size-9" />
      </div>
      <h4 className="mb-1.5 text-lg font-semibold text-text">{title}</h4>
      {description && (
        <p className="mx-auto mb-4 max-w-[38ch] text-[13.5px] text-muted">{description}</p>
      )}
      {action}
    </div>
  );
}
