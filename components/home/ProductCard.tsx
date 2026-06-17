import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { WishButton } from "@/components/ui/wish-button";
import { getProduct, productPath, productHero } from "@/lib/data/products";
import { whatsappLink } from "@/lib/data/business";

/**
 * بطاقة المنتج — مطابقة لبطاقة الريفرنس (.pcard): شارة + مفضّلة + تكبير صورة عند الهوفر
 * + شريط ينزلق من الأسفل. **بلا أسعار** (الموقع كتالوج/توليد عملاء) → «السعر عند الطلب»
 * والشريط المنزلق = «استفسر واتساب». رابط ممتدّ (stretched link) للزحف والتنقّل.
 */

/** ألوان متوفّرة تقريبية لكل نوع (لنقاط الألوان في البطاقة). */
const colorsBySlug: Record<string, string[]> = {
  "موكيت-مساجد": ["#5E6B5A", "#8E5C39", "#16213A", "#B98E6B"],
  "موكيت-مكاتب": ["#837C72", "#2C2925", "#16213A"],
  "موكيت-تركي": ["#7E4A35", "#16213A", "#B98E6B", "#5E6B5A"],
  "عشب-صناعي": ["#4e7a5e", "#5E6B5A"],
  "فينيل": ["#8E7A66", "#C9B58E", "#2C2925"],
  "أرضيات-جيم": ["#2C2925", "#837C72"],
  "أرضيات-خيول": ["#2C2925", "#3a3a3a"],
  "أرضيات-مانعة-للانزلاق": ["#16213A", "#2C2925", "#837C72"],
  "أرضيات-مكتبية": ["#837C72", "#8E7A66", "#2C2925"],
};

export function ProductCard({
  slug,
  badge,
  badgeKind = "best",
}: {
  slug: string;
  badge?: string;
  badgeKind?: "best" | "new" | "soft";
}) {
  const p = getProduct(slug);
  const hero = productHero(slug);
  if (!p) return null;

  const colors = colorsBySlug[slug] ?? [];
  const wa = whatsappLink(`السلام عليكم، أرغب بالاستفسار عن ${p.nameAr} (السعر والتوفّر)`);
  const badgeClass = badge === "جديد" ? "badge-new" : badgeKind === "soft" ? "badge-soft badge-dot" : "badge-soft badge-dot";

  return (
    <article className="pcard">
      <div className="media">
        {hero ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="(max-width:560px) 72vw, (max-width:820px) 45vw, 250px"
            className="coverimg"
          />
        ) : (
          <span className="ph">
            <Icon name={p.icon} />
          </span>
        )}
        <div className="badges">{badge ? <span className={`badge ${badgeClass}`}>{badge}</span> : null}</div>
        <WishButton className="wish" />
        <div className="quick">
          <a
            className="btn btn-primary btn-sm btn-block"
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" /> استفسر واتساب
          </a>
        </div>
      </div>

      {/* رابط ممتدّ يغطّي البطاقة (يبقى زرّا المفضّلة/الواتساب فوقه بـ z-index أعلى) */}
      <Link href={productPath(slug)} className="card-link" aria-label={p.nameAr} />

      <div className="body">
        <span className="eyebrow">{p.shortName}</span>
        <h3 className="title">{p.nameAr}</h3>
        <span className="feat-line">
          <Icon name="check" /> {p.features[0]}
        </span>
        <span className="on-req">السعر عند الطلب</span>
        {colors.length ? (
          <div className="swrow">
            {colors.slice(0, 4).map((c, i) => (
              <span key={i} className="swdot" style={{ background: c }} />
            ))}
            {colors.length > 4 ? <span className="more">+{colors.length - 4}</span> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
