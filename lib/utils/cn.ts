/** دمج بسيط لأسماء الكلاس (يتجاهل القيم الفارغة) — بلا تبعيات. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
