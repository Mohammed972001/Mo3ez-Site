/**
 * Single source of truth for business facts (NAP) — consumed by the
 * header/footer/contact UI and by JSON-LD (LocalBusiness/Organization).
 * Keeping these values identical everywhere is a strong local-SEO signal.
 *
 * Brand name FINALIZED by the owner on 2026-07-17 (spec 002, FR-016).
 * Three near-identical «السريع» namesakes compete in this niche — always
 * use the FULL name below verbatim for brand-entity differentiation.
 */

export const business = {
  /** Official brand name — FINAL (do not change without owner sign-off) */
  name: "السريع للموكيت والأرضيات",
  shortName: "السريع",
  legalName: "السريع للموكيت والأرضيات",

  /** التواصل — صيغة موحّدة في كل مكان */
  phone: {
    /** صيغة العرض المحلية */
    display: "0546465316",
    /** صيغة دولية للـ tel: و schema */
    intl: "+966546465316",
    /** رقم واتساب بصيغة wa.me (بدون +) */
    whatsapp: "966546465316",
  },

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

/** رابط واتساب جاهز برسالة مُعبّأة (lead-gen) */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${business.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** رابط اتصال مباشر */
export const telLink = `tel:${business.phone.intl}`;

export type Business = typeof business;
