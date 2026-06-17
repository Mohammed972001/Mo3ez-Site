import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { business, whatsappLink, telLink } from "@/lib/data/business";

const SITE_URL = "https://www.mokeet-elsuarye.com";

export const metadata: Metadata = {
  title: `تواصل معنا | ${business.name} — ${business.address.city}`,
  description: `تواصل مع ${business.name} في ${business.address.city}: واتساب، اتصال مباشر على ${business.phone.display}، خدمة 24 ساعة. موكيت وأرضيات مع توصيل وتركيب احترافي.`,
  alternates: { canonical: "/contact" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${business.address.city} ${business.address.district} ${business.address.landmark}`,
)}&output=embed`;

function LocalBusinessLd() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: `${SITE_URL}/contact`,
    telephone: business.phone.intl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.district} - ${business.address.landmark}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: business.areaServed,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}

export default function ContactPage() {
  return (
    <main>
      <LocalBusinessLd />
      <section className="page-hero">
        <div className="wrap">
          <div className="kick">تواصل معنا</div>
          <h1>نحن في خدمتك على مدار الساعة</h1>
          <p>
            راسلنا على واتساب أو اتصل بنا مباشرة لطلب عرض سعر أو استشارة مجانية حول الموكيت والأرضيات —
            خدمة 24 ساعة في {business.address.city} وكل مدن المملكة.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="info-grid">
            <a className="info-card" href={whatsappLink("السلام عليكم، أرغب بعرض سعر")} target="_blank" rel="noopener noreferrer">
              <div className="ic">
                <Icon name="whatsapp" />
              </div>
              <div>
                <b>واتساب</b>
                <span>أسرع طريقة لعرض السعر والاستشارة</span>
              </div>
            </a>
            <a className="info-card" href={telLink} dir="ltr">
              <div className="ic">
                <Icon name="phone" />
              </div>
              <div>
                <b>اتصال مباشر</b>
                <span>{business.phone.display}</span>
              </div>
            </a>
            <div className="info-card">
              <div className="ic">
                <Icon name="location" />
              </div>
              <div>
                <b>العنوان</b>
                <span>{business.address.full}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="ic">
                <Icon name="truck" />
              </div>
              <div>
                <b>ساعات العمل</b>
                <span>{business.hours.label} · توصيل وتركيب لكل المملكة</span>
              </div>
            </div>
          </div>

          <iframe
            className="map-embed"
            src={mapSrc}
            title={`موقع ${business.name} على الخريطة`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
