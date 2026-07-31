import { NextResponse } from "next/server";

/**
 * Review submission endpoint (spec 003, US2).
 *
 * Submissions are delivered for MODERATION — nothing is published automatically.
 * Delivery is pluggable so the owner can wire it to whatever they already use:
 *   REVIEW_WEBHOOK_URL — any endpoint that accepts JSON (Zapier / Make /
 *   Google Apps Script / n8n / a mail relay). When unset, the submission is
 *   still recorded in the server log so nothing is silently lost.
 *
 * Approved reviews are then added by hand to lib/data/reviews.ts.
 */

export const runtime = "nodejs";

interface Payload {
  author?: string;
  phone?: string;
  product?: string;
  city?: string;
  text?: string;
  rating?: number;
  website?: string; // honeypot
  elapsedMs?: number;
}

const MIN_FILL_MS = 3000; // humans take longer than this to write a review

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // --- bot checks (silently accept so bots don't learn the rule) ----------
  const looksAutomated =
    Boolean(body.website?.trim()) || (body.elapsedMs ?? 0) < MIN_FILL_MS;
  if (looksAutomated) return NextResponse.json({ ok: true });

  // --- validation --------------------------------------------------------
  const author = (body.author ?? "").trim().slice(0, 60);
  const text = (body.text ?? "").trim().slice(0, 1200);
  const rating = Number(body.rating);
  if (!author || author.length < 2) {
    return NextResponse.json({ ok: false, error: "author" }, { status: 422 });
  }
  if (!text || text.length < 10) {
    return NextResponse.json({ ok: false, error: "text" }, { status: 422 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, error: "rating" }, { status: 422 });
  }

  const submission = {
    type: "review",
    receivedAt: new Date().toISOString(),
    author,
    rating,
    text,
    phone: (body.phone ?? "").trim().slice(0, 20),
    product: (body.product ?? "").trim().slice(0, 60),
    city: (body.city ?? "").trim().slice(0, 60),
  };

  // --- delivery ----------------------------------------------------------
  const hook = process.env.REVIEW_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(submission),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch (err) {
      // Log the full submission so it is recoverable from Vercel logs even
      // when the webhook is down, then tell the client to use the fallback.
      console.error("[review] webhook failed", err, JSON.stringify(submission));
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    }
  } else {
    console.info("[review] submission (no webhook configured)", JSON.stringify(submission));
  }

  return NextResponse.json({ ok: true });
}
