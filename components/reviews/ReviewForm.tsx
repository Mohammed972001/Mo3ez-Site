"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { whatsappLink } from "@/lib/data/business";

/**
 * Customer review submission (spec 003, US2).
 *
 * Submissions are NOT published automatically — they are delivered to the
 * business for verification, then added to lib/data/reviews.ts once the owner
 * confirms the customer and the job. This is what keeps the published list
 * genuine (and the site un-spammable, since it is statically generated).
 *
 * Bot protection: a hidden honeypot field plus a minimum fill time. Both are
 * invisible to real users — no CAPTCHA friction for Arabic mobile visitors.
 */

const PRODUCT_OPTIONS = [
  "موكيت مساجد",
  "موكيت مكاتب",
  "موكيت تركي مشجّر",
  "عشب صناعي",
  "فينيل رول",
  "باركيه خشب",
  "فينيل طبي",
  "أرضيات مستشفيات",
  "أرضيات مطاطية",
  "خدمة التركيب",
  "أخرى",
];

type Status = "idle" | "sending" | "ok" | "error";

export function ReviewForm({ defaultProduct }: { defaultProduct?: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      author: String(fd.get("author") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      product: String(fd.get("product") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      text: String(fd.get("text") ?? "").trim(),
      rating,
      // bot signals
      website: String(fd.get("website") ?? ""), // honeypot: must stay empty
      elapsedMs: Date.now() - startedAt,
    };

    if (!payload.rating) return setError("من فضلك اختر تقييمًا من 1 إلى 5 نجوم.");
    if (payload.author.length < 2) return setError("من فضلك اكتب اسمك.");
    if (payload.text.length < 10) return setError("اكتب رأيك في جملة قصيرة على الأقل (١٠ أحرف).");

    setStatus("sending");
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rv-done" role="status">
        <span className="ic" aria-hidden="true">
          <Icon name="check" />
        </span>
        <h3>وصلنا تقييمك — شكرًا لك!</h3>
        <p>
          نراجع كل تقييم قبل نشره للتأكد من أنه من عميل حقيقي، وننشره خلال أيام قليلة. نقدّر وقتك
          كثيرًا.
        </p>
      </div>
    );
  }

  const waFallback = whatsappLink("السلام عليكم، أرغب بإرسال تقييم عن خدمتكم:");

  return (
    <form className="rv-form" onSubmit={onSubmit} noValidate>
      {/* rating */}
      <fieldset className="rv-rate">
        <legend>تقييمك للخدمة *</legend>
        <div className="rv-stars-input" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              className={(hover || rating) >= i ? "on" : ""}
              onMouseEnter={() => setHover(i)}
              onClick={() => setRating(i)}
              aria-label={`${i} من 5`}
              aria-pressed={rating === i}
            >
              <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"
                fill={(hover || rating) >= i ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round">
                <path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8Z" />
              </svg>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="rv-row">
        <label>
          <span>الاسم *</span>
          <input name="author" type="text" required autoComplete="name" placeholder="مثال: محمد ع." />
        </label>
        <label>
          <span>الجوال (لا يُنشر)</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="05xxxxxxxx" dir="ltr" />
        </label>
      </div>

      <div className="rv-row">
        <label>
          <span>المنتج / الخدمة</span>
          <select name="product" defaultValue={defaultProduct ?? ""}>
            <option value="">— اختر —</option>
            {PRODUCT_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>المدينة / الحي</span>
          <input name="city" type="text" placeholder="مثال: الرياض — العزيزية" />
        </label>
      </div>

      <label className="rv-full">
        <span>رأيك *</span>
        <textarea name="text" rows={4} required placeholder="اكتب تجربتك مع المنتج أو التركيب…" />
      </label>

      {/* honeypot — hidden from users, bots fill it */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="rv-hp"
      />

      {error ? (
        <p className="rv-err" role="alert">
          {error}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="rv-err" role="alert">
          تعذّر الإرسال. جرّب مرة أخرى، أو أرسل تقييمك مباشرة عبر{" "}
          <a href={waFallback} target="_blank" rel="noopener noreferrer">
            واتساب
          </a>
          .
        </p>
      ) : null}

      <div className="cta-row">
        <button className="btn btn-accent btn-lg" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "جارٍ الإرسال…" : "أرسل التقييم"}
        </button>
        <a className="btn btn-secondary" href={waFallback} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" /> أرسله واتساب
        </a>
      </div>

      <p className="rv-note">
        نراجع كل تقييم للتأكد من أنه من عميل حقيقي قبل نشره. لا ننشر رقم جوالك، ولا نحذف التقييمات
        السلبية.
      </p>
    </form>
  );
}
