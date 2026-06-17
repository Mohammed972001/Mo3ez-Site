"use client";

import { useState, type ReactNode } from "react";

/** تبويبات تفاصيل المنتج — المحتوى يُرندَر خادميًّا، والعميل يبدّل الظهور فقط. */
export function Tabs({ tabs }: { tabs: { key: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  return (
    <div>
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="tab-body">
        {tabs.map((t) => (
          <div key={t.key} role="tabpanel" hidden={active !== t.key}>
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
