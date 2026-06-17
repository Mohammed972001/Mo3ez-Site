"use client";

import { useState } from "react";
import { Icon } from "./icon";

/** عدّاد كمية — أزرار 42×42 (هدف لمس مناسب)، قيمة بأرقام جدولية. */
export function QtyStepper({
  initial = 1,
  min = 1,
  max = 99,
  onChange,
}: {
  initial?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}) {
  const [value, setValue] = useState(initial);

  function update(next: number) {
    const clamped = Math.max(min, Math.min(max, next));
    setValue(clamped);
    onChange?.(clamped);
  }

  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-border bg-bg">
      <button
        type="button"
        onClick={() => update(value - 1)}
        disabled={value <= min}
        aria-label="إنقاص الكمية"
        className="grid size-[42px] place-items-center text-text transition-colors hover:bg-surface disabled:opacity-40"
      >
        <Icon name="minus" className="size-4" />
      </button>
      <span
        className="min-w-[46px] text-center text-[15px] font-bold tnum"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => update(value + 1)}
        disabled={value >= max}
        aria-label="زيادة الكمية"
        className="grid size-[42px] place-items-center text-text transition-colors hover:bg-surface disabled:opacity-40"
      >
        <Icon name="plus" className="size-4" />
      </button>
    </div>
  );
}
