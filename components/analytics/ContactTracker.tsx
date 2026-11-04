"use client";

import { useEffect } from "react";
import { trackContact, type ContactMethod } from "@/lib/analytics";

function contactMethod(href: string): ContactMethod | null {
  if (href.startsWith("tel:")) return "call";
  if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) return "whatsapp";
  return null;
}

/**
 * One delegated listener for every WhatsApp and call link on the site, so a link
 * added later is tracked without touching it. Capture phase: it runs before the
 * browser leaves for WhatsApp or the dialer, and before a handler can remove the link.
 */
export function ContactTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Skips the agency credit in the footer: a chat with the agency is not a lead.
      const link = (event.target as Element | null)?.closest?.("a:not([data-credit])");
      const href = link?.getAttribute("href");
      if (!href) return;

      const method = contactMethod(href);
      if (!method) return;

      // GA4 keeps only 100 characters of link_url, so WhatsApp reports the chat number without the message.
      trackContact(method, { link_url: href.split("?")[0], page_path: window.location.pathname });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
