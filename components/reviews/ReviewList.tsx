import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Stars } from "./Stars";
import { aggregate, type Review } from "@/lib/data/reviews";

/**
 * Genuine-review display (spec 003, US2).
 * Renders nothing but an invitation when there are no reviews yet — the site
 * must never imply ratings it does not have.
 */

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-SA", { year: "numeric", month: "long" });
}

export function ReviewList({
  list,
  title = "آراء عملائنا",
  kicker = "تقييمات حقيقية",
  emptyLead = "كن أول من يقيّم خدمتنا — رأيك يساعد غيرك على الاختيار.",
}: {
  list: Review[];
  title?: string;
  kicker?: string;
  emptyLead?: string;
}) {
  const agg = aggregate(list);

  return (
    <section style={{ marginTop: 44 }} aria-labelledby="reviews-h">
      <div className="s-head">
        <div>
          <div className="kick">{kicker}</div>
          <h2 id="reviews-h">{title}</h2>
        </div>
        <Link className="more" href="/review">
          أضف تقييمك <Icon name="chevLeft" />
        </Link>
      </div>

      {agg ? (
        <div className="rv-agg">
          <b>{agg.value}</b>
          <Stars rating={Number(agg.value)} size={18} />
          <span>
            من {agg.count} {agg.count === 1 ? "تقييم" : "تقييمات"}
          </span>
        </div>
      ) : null}

      {list.length ? (
        <div className="rv-grid">
          {list.map((r, i) => (
            <article className="rv-card" key={`${r.author}-${r.date}-${i}`}>
              <header>
                <span className="rv-who">
                  <span className="rv-avatar" aria-hidden="true">
                    <Icon name="user" />
                  </span>
                  <b>{r.author}</b>
                </span>
                <Stars rating={r.rating} />
              </header>
              <p>{r.text}</p>
              <footer>
                <time dateTime={r.date}>{fmtDate(r.date)}</time>
                {r.city ? <span> · {r.city}</span> : null}
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <div className="rv-empty">
          <p>{emptyLead}</p>
          <Link className="btn btn-primary" href="/review">
            <Icon name="star" /> أضف تقييمك
          </Link>
        </div>
      )}
    </section>
  );
}
