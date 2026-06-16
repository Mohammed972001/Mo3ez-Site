import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Badge } from "./badge";
import { Price } from "./price";
import { Rating } from "./rating";
import { WishButton } from "./wish-button";

export type ProductBadge = "sale" | "new" | "low" | "best";

export interface ProductCardData {
  href: string;
  title: string;
  eyebrow?: string;
  price: number;
  was?: number;
  rating: number;
  count: number;
  badge?: ProductBadge;
  image: { src: string; alt: string };
}

function CardBadge({ badge, was, price }: { badge: ProductBadge; was?: number; price: number }) {
  if (badge === "sale" && was) {
    const off = Math.round((1 - price / was) * 100);
    return <Badge variant="sale">خصم {off}%</Badge>;
  }
  if (badge === "new") return <Badge variant="new">جديد</Badge>;
  if (badge === "low") return <Badge variant="low">قطع محدودة</Badge>;
  return (
    <Badge variant="soft" dot>
      الأكثر مبيعاً
    </Badge>
  );
}

/** بطاقة منتج — server component. الرابط ممتدّ يغطّي البطاقة (before:inset-0)،
   وزر المفضلة فوقه (z-10). الصورة عبر next/image بأبعاد محجوزة (CLS=0). */
export function ProductCard({
  data,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority = false,
  className,
}: {
  data: ProductCardData;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const { href, title, eyebrow, price, was, rating, count, badge, image } = data;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.045]"
        />
        {badge && (
          <div className="absolute start-2.5 top-2.5 flex flex-col items-start gap-1.5">
            <CardBadge badge={badge} was={was} price={price} />
          </div>
        )}
        <div className="absolute end-2.5 top-2.5">
          <WishButton />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3.5">
        {eyebrow && (
          <span className="text-[11px] uppercase tracking-wide text-muted">{eyebrow}</span>
        )}
        <h3 className="text-base font-semibold leading-snug text-text">
          <a href={href} className="before:absolute before:inset-0 before:z-[1]">
            {title}
          </a>
        </h3>
        <Rating value={rating} count={count} />
        <Price price={price} was={was} />
      </div>
    </article>
  );
}
