"use client";

import { cn } from "@/lib/utils/cn";

/** عيّنة لون قابلة للاختيار (حلقة عند التحديد). */
export function Swatch({
  color,
  title,
  selected = false,
  disabled = false,
  onClick,
  className,
}: {
  color: string;
  title: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={selected}
      style={{ background: color }}
      className={cn(
        "relative size-[34px] rounded-full border border-text/15 transition-transform",
        "after:absolute after:-inset-1 after:rounded-full after:border-[1.5px] after:border-transparent after:transition-colors",
        selected ? "after:border-text" : "hover:after:border-text/35",
        disabled && "cursor-not-allowed opacity-40",
        className,
      )}
    />
  );
}

/** زر اختيار المقاس. */
export function SizeButton({
  label,
  unit,
  selected = false,
  disabled = false,
  onClick,
}: {
  label: string;
  unit?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "min-w-16 rounded-[9px] border px-3 py-2.5 text-center text-[13px] font-semibold leading-tight transition-colors",
        selected
          ? "border-primary bg-primary text-on-primary"
          : "border-border bg-bg text-text hover:border-text",
        disabled && "cursor-not-allowed text-muted line-through opacity-50",
      )}
    >
      <span dir="ltr">{label}</span>
      {unit && <small className="block text-[10.5px] font-medium opacity-75">{unit}</small>}
    </button>
  );
}
