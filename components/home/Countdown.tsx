"use client";

import { useEffect, useState } from "react";

/**
 * عدّاد تنازلي لعرض «لفترة محدودة» (تصميم A). منقول من JS الريفرنس.
 * يبدأ بقيمة ثابتة (SSR) ثم يُحدَّث على العميل لتفادي عدم تطابق الترطيب (hydration).
 * الهدف الافتراضي: بعد 30 ساعة و24 دقيقة من أول تحميل في الجلسة.
 */
const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ hours = 30, minutes = 24 }: { hours?: number; minutes?: number }) {
  const [t, setT] = useState({ d: "01", h: "06", m: "24", s: "00" });

  useEffect(() => {
    const target = Date.now() + (hours * 3600 + minutes * 60) * 1000;
    const tick = () => {
      let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const d = Math.floor(s / 86400);
      s %= 86400;
      const h = Math.floor(s / 3600);
      s %= 3600;
      const m = Math.floor(s / 60);
      const sec = s % 60;
      setT({ d: pad(d), h: pad(h), m: pad(m), s: pad(sec) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hours, minutes]);

  return (
    <div className="countdown" aria-label="الوقت المتبقّي للعرض">
      <div className="cd-unit">
        <b>{t.d}</b>
        <span>يوم</span>
      </div>
      <div className="cd-unit">
        <b>{t.h}</b>
        <span>ساعة</span>
      </div>
      <div className="cd-unit">
        <b>{t.m}</b>
        <span>دقيقة</span>
      </div>
      <div className="cd-unit">
        <b>{t.s}</b>
        <span>ثانية</span>
      </div>
    </div>
  );
}
