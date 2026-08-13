/**
 * Single source of truth for business facts (NAP) — consumed by the
 * header/footer/contact UI and by JSON-LD (LocalBusiness/Organization).
 * Keeping these values identical everywhere is a strong local-SEO signal.
 *
 * Brand name FINALIZED by the owner on 2026-07-17 (spec 002, FR-016).
 * Three near-identical «السريع» namesakes compete in this niche — always
 * use the FULL name below verbatim for brand-entity differentiation.
 */

/** Contact lines, PRIMARY FIRST. Every phone shown anywhere on the site (and
 *  in every external listing — see `npm run business:kit`) comes from here.
 *  Keep the local display format exactly as the business publishes it. */
const phones = [
  {
    /** Local display format */
    display: "0546465316",
    /** International format for tel: links and schema */
    intl: "+966546465316",
    /** wa.me format (digits only, no +) */
    whatsapp: "966546465316",
    label: "الخط الأول",
  },
  {
    display: "0538965654",
    intl: "+966538965654",
    whatsapp: "966538965654",
    label: "الخط الثاني",
  },
] as const;

export const business = {
  /** Official brand name — FINAL (do not change without owner sign-off) */
  name: "السريع للموكيت والأرضيات",
  shortName: "السريع",
  legalName: "السريع للموكيت والأرضيات",

  /** Primary contact line (kept as `phone` so existing call sites work). */
  phone: phones[0],
  /** All contact lines, primary first — both accept calls and WhatsApp. */
  phones,

  /** العنوان (NAP) — قابل للتغيير */
  address: {
    region: "منطقة الرياض",
    city: "الرياض",
    district: "العزيزية",
    landmark: "حراج بن قاسم",
    country: "SA",
    full: "الرياض، حي العزيزية، حراج بن قاسم",
  },

  /** الإحداثيات — تُضبط لاحقًا عند تأكيد الموقع على الخريطة */
  geo: {
    lat: 24.6133, // الرياض (تقريبي — يُحدَّث)
    lng: 46.7376,
  },

  /** ساعات العمل — 24/7 حاليًا (قابلة للتغيير) */
  hours: {
    is24x7: true,
    label: "مفتوح 24 ساعة",
  },

  /** مناطق الخدمة — للـ areaServed في schema وصفحات المناطق لاحقًا */
  areaServed: ["الرياض", "جدة", "الدمام", "الخبر", "مكة المكرمة", "المدينة المنورة"],

  /** روابط التواصل الاجتماعي — تُملأ عند توفّرها (sameAs في schema) */
  social: [] as string[],
} as const;

/** WhatsApp link with an optional pre-filled message (lead-gen).
 *  Defaults to the primary line; pass a wa.me number for a specific line. */
export function whatsappLink(message?: string, waNumber?: string): string {
  const base = `https://wa.me/${waNumber ?? business.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** tel: link for the primary line. */
export const telLink = `tel:${business.phone.intl}`;

/** tel: link for any line. */
export function telLinkFor(intl: string): string {
  return `tel:${intl}`;
}

/** All lines in international format — used for schema `telephone`. */
export const allPhonesIntl = business.phones.map((p) => p.intl);

export type Business = typeof business;
