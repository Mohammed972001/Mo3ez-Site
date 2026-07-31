/**
 * Customer reviews (spec 003, US2).
 *
 * ⚠️ INTEGRITY RULES — read before adding an entry:
 * 1. ONLY genuine reviews from real customers. Never invent, embellish, or
 *    pad this list. A fabricated review is fraud and a Google policy breach.
 * 2. Entries are added here only AFTER the owner verifies the customer and
 *    the job. Submissions from the on-site form are delivered for moderation;
 *    they never appear automatically.
 * 3. Schema policy: reviews collected on our own site about our own business
 *    are "self-serving" and MUST NOT be emitted as LocalBusiness/Organization
 *    aggregateRating (Google disallows it). Product-level reviews from real
 *    customers ARE eligible — that is why `productSlug` matters: only reviews
 *    tied to a product feed Product/aggregateRating markup.
 * 4. Never copy reviews from Google Business Profile or any third-party
 *    platform into this file to mark them up as ours.
 */

export type ReviewSource = "site" | "whatsapp" | "phone" | "in-store";

export interface Review {
  /** Customer display name as they gave it (first name + initial is fine). */
  author: string;
  /** 1–5, as the customer rated. */
  rating: number;
  /** ISO date the review was given, e.g. "2026-08-05". */
  date: string;
  /** The customer's own words (Arabic). Light typo fixes only — never rewrite. */
  text: string;
  /** Where the review reached us. */
  source: ReviewSource;
  /** Product slug when the review is about a specific product — required for
   *  the review to be eligible for Product schema. Omit for general reviews. */
  productSlug?: string;
  /** City/district, when the customer volunteered it (local relevance). */
  city?: string;
}

/** Verified reviews. Empty until real customers send them — by design. */
export const reviews: Review[] = [];

/** All reviews, newest first. */
export function allReviews(): Review[] {
  return [...reviews].sort((a, b) => b.date.localeCompare(a.date));
}

/** Reviews for one product (newest first). */
export function reviewsForProduct(slug: string): Review[] {
  return allReviews().filter((r) => r.productSlug === slug);
}

/** Aggregate for a set of reviews, or null when there are none.
 *  Returning null is what keeps rating markup off the page while the list
 *  is empty — never emit a rating we cannot back with real reviews. */
export function aggregate(list: Review[]): { value: string; count: number } | null {
  if (!list.length) return null;
  const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
  return { value: (Math.round(avg * 10) / 10).toFixed(1), count: list.length };
}
