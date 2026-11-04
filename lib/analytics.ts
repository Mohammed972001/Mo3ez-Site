/**
 * GA4 measurement id, set at build time in .github/workflows/deploy.yml.
 * While it is empty (local dev) no tag loads and nothing is sent.
 */
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export type ContactMethod = "whatsapp" | "call";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Records one tap on a contact link. `method` feeds the "Contact method" custom dimension in GA4. */
export function trackContact(method: ContactMethod, meta: Record<string, string>) {
  window.gtag?.("event", "contact_click", { method, ...meta });
}
