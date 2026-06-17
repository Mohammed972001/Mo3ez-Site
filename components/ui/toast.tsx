"use client";

import { cn } from "@/lib/utils/cn";
import { Icon } from "./icon";

/** إشعار (نجاح/خطأ) مع زرّ إغلاق اختياري. */
export function Toast({
  tone = "success",
  title,
  message,
  onClose,
}: {
  tone?: "success" | "error";
  title: string;
  message?: string;
  onClose?: () => void;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex max-w-sm items-start gap-3 rounded-xl border border-border bg-bg p-3.5 shadow-lg",
        tone === "error" ? "border-s-[3px] border-s-sale" : "border-s-[3px] border-s-success",
      )}
    >
      <Icon
        name={tone === "error" ? "info" : "checkCircle"}
        className={cn("mt-0.5 size-[22px] shrink-0", tone === "error" ? "text-sale" : "text-success")}
      />
      <div className="flex-1">
        <b className="block text-sm font-bold text-text">{title}</b>
        {message && <span className="text-[12.5px] text-muted">{message}</span>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="إغلاق" className="text-muted hover:text-text">
          <Icon name="x" className="size-4" />
        </button>
      )}
    </div>
  );
}
