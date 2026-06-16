import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-xl border border-transparent transition-[background,color,border-color,filter,box-shadow] duration-150 cursor-pointer active:translate-y-px disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-[1.1em]";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:brightness-95 active:brightness-90",
  secondary: "bg-transparent text-text border-text hover:bg-text/10",
  accent: "bg-accent text-on-accent hover:brightness-95 active:brightness-90",
  ghost: "bg-transparent text-text hover:bg-text/[0.07]",
};

const sizes: Record<Size, string> = {
  sm: "text-[13px] px-3.5 py-2.5 rounded-[9px]",
  md: "text-sm px-5 py-3",
  lg: "text-[15px] px-6 py-[15px] rounded-[11px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children?: ReactNode;
}

/** زر — يُرسم كـ <a> عند تمرير href (روابط حقيقية قابلة للزحف، المادة 1)، وإلا <button>. */
export function Button({
  variant = "primary",
  size = "md",
  block = false,
  className,
  href,
  ...rest
}: CommonProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )) {
  const classes = cn(base, variants[variant], sizes[size], block && "w-full", className);

  if (href !== undefined) {
    return <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}

/** زر أيقونة مربّع (44×44 — هدف لمس مناسب للجوال). */
export function IconButton({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "grid size-11 place-items-center rounded-xl border border-border text-text transition-colors hover:bg-surface [&_svg]:size-5 disabled:opacity-40",
        className,
      )}
      {...rest}
    />
  );
}
