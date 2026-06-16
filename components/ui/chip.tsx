"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./icon";

/** شريحة فلتر — قابلة للتفعيل والإزالة. تُرسم كزر (تفاعلية). */
export function Chip({
  active = false,
  onRemove,
  onClick,
  dashed = false,
  children,
  className,
}: {
  active?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  dashed?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors",
        active
          ? "border-primary bg-primary text-on-primary"
          : "border-border bg-bg text-text hover:border-text",
        dashed && "border-dashed",
        className,
      )}
    >
      {onClick ? (
        <button type="button" onClick={onClick} className="cursor-pointer">
          {children}
        </button>
      ) : (
        children
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="إزالة الفلتر"
          className="cursor-pointer opacity-70 hover:opacity-100"
        >
          <Icon name="x" className="size-[15px]" />
        </button>
      )}
    </span>
  );
}
