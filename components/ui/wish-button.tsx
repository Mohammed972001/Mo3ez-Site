"use client";

import { useState } from "react";
import { Icon } from "./icon";
import { cn } from "@/lib/utils/cn";

/** زر «أضف للمفضلة» — جزيرة تفاعلية صغيرة فوق بطاقة المنتج. */
export function WishButton({ className }: { className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-label={on ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
      aria-pressed={on}
      className={cn(
        "relative z-10 grid size-9 place-items-center rounded-full bg-bg/85 text-text backdrop-blur transition-transform hover:scale-110",
        on && "text-sale",
        className,
      )}
    >
      <Icon name="heart" className={cn("size-[18px]", on && "fill-current")} />
    </button>
  );
}
