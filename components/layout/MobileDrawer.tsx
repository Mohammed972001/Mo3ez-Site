"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ProductsMenu } from "./MegaMenu";
import { whatsappLink, telLink } from "@/lib/data/business";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "كل المنتجات", href: "/mokeet" },
  { label: "المدوّنة", href: "/blog" },
  { label: "من نحن", href: "/about" },
  { label: "تواصل", href: "/contact" },
];

/** درج تنقّل للجوال — يفتحه زر الهمبرغر. */
export function MobileDrawer() {
  const [open, setOpen] = useState(false);

  // قفل التمرير خلف الدرج عند فتحه.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // إغلاق بمفتاح Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="فتح القائمة"
        aria-expanded={open}
        className="nav-hamburger size-11 place-items-center rounded-xl text-text hover:bg-surface"
      >
        <Icon name="menu" className="size-6" />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="قائمة التنقّل">
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={close}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute bottom-0 end-0 top-0 flex w-[86%] max-w-sm flex-col bg-bg shadow-xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-display text-lg font-bold text-text">القائمة</span>
              <button
                type="button"
                onClick={close}
                aria-label="إغلاق"
                className="grid size-10 place-items-center rounded-xl text-text hover:bg-surface"
              >
                <Icon name="x" className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <nav aria-label="روابط رئيسية">
                <ul className="space-y-1">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={close}
                        className="block rounded-xl px-3 py-2.5 text-[15px] font-semibold text-text hover:bg-surface"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <p className="mb-2 mt-5 px-3 text-[11px] font-bold uppercase tracking-widest text-[var(--c-muted)]">
                المنتجات
              </p>
              <ProductsMenu onNavigate={close} />
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-[var(--c-border)] p-4">
              <a href={whatsappLink()} onClick={close} className="btn btn-accent btn-sm">
                <Icon name="whatsapp" /> واتساب
              </a>
              <a href={telLink} onClick={close} className="btn btn-secondary btn-sm">
                <Icon name="phone" /> اتصال
              </a>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
