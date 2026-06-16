import type { Metadata } from "next";
import "./globals.css";
import { business } from "@/lib/data/business";

export const metadata: Metadata = {
  title: {
    default: `${business.name} — موكيت وأرضيات الرياض`,
    template: `%s | ${business.name}`,
  },
  description:
    "موكيت ومفروشات وأرضيات بالرياض: موكيت مساجد ومكاتب، عشب صناعي، فينيل، وأرضيات مطاطية — توصيل وتركيب. تواصل واتساب مباشر.",
  metadataBase: new URL("https://example.com"), // يُضبط النطاق الحقيقي في T06
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // عربي RTL أصلي — أساس كل الصفحات (الدستور: المادة 1 و2).
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
