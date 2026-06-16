import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./icon";

const fieldBase =
  "w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-sm text-text transition-[border-color,box-shadow] placeholder:text-muted hover:border-text/40 focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/25 disabled:bg-surface disabled:text-muted";

export function Input({
  className,
  invalid,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={cn(fieldBase, invalid && "border-sale ring-[3px] ring-sale/20", className)}
      {...rest}
    />
  );
}

export function Select({
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(fieldBase, "cursor-pointer appearance-none pe-10", className)} {...rest}>
        {children}
      </select>
      <Icon
        name="chevDown"
        className="pointer-events-none absolute inset-y-0 end-3.5 my-auto size-4 text-muted"
      />
    </div>
  );
}

/** حقل معنون مع تلميح/خطأ اختياري. */
export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-text">{label}</span>
      {children}
      {error ? (
        <span className="text-[11.5px] font-semibold text-sale">{error}</span>
      ) : hint ? (
        <span className="text-[11.5px] text-muted">{hint}</span>
      ) : null}
    </label>
  );
}
