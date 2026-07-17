import type { Metadata } from "next";
import { Reem_Kufi, Cairo } from "next/font/google";
import "./globals.css";
import "./ds-components.css";
import "./ds-storefront.css";
import { business } from "@/lib/data/business";
import { SITE_URL } from "@/lib/seo/site";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

/* Type 3 (الجانب العربي) — العناوين: ريم كوفي · النص: Cairo.
   موقع عربي أولًا: نستضيف خطّي العربية فقط (self-hosted, display:swap) — أخفّ وأسرع
   (LCP)، والخط العربي أول المكدّس فلا يعترضه أي fallback لاتيني. */
const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-reem",
  display: "swap",
});
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

const fontVars = `${reemKufi.variable} ${cairo.variable}`;

export const metadata: Metadata = {
  // Default title only — every page sets its own full title (brand included).
  title: `${business.name} — موكيت وأرضيات الرياض`,
  description:
    "موكيت ومفروشات وأرضيات بالرياض: موكيت مساجد ومكاتب، عشب صناعي، فينيل، وأرضيات مطاطية — توصيل وتركيب. تواصل واتساب مباشر.",
  metadataBase: new URL(SITE_URL),
  // Search-console ownership verification (spec 002, T004). Tags render only
  // when the env vars are set in Vercel — see .env.example and owner-actions.md.
  verification: {
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } }
      : {}),
  },
};

/* يضبط الوضع (داكن/فاتح) قبل الرسم لمنع وميض الثيم — يقرأ التخزين ثم تفضيل النظام. */
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // عربي RTL أصلي. suppressHydrationWarning لأن سكربت الثيم يعدّل data-theme قبل الترطيب.
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${fontVars} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <UtilityBar />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
