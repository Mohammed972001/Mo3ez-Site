"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/data/gallery.generated";

/**
 * معرض صور المنتج (تصميم A): صورة رئيسية + مصغّرات قابلة للنقر تبدّلها.
 * الصورة الأولى `priority` (LCP). المصغّرات محدودة بـ 10 لتفادي طول مفرط.
 */
export function Gallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  const main = images[active] ?? images[0];
  const thumbs = images.slice(0, 10);

  return (
    <div className="gallery">
      <div className="g-main">
        <Image
          src={main.src}
          alt={main.alt || name}
          fill
          priority
          sizes="(max-width:980px) 100vw, 50vw"
        />
      </div>
      {thumbs.length > 1 ? (
        <div className="g-thumbs">
          {thumbs.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={`th ${i === active ? "sel" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`عرض الصورة ${i + 1} من ${name}`}
              aria-pressed={i === active}
            >
              <Image src={img.src} alt="" fill sizes="90px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
