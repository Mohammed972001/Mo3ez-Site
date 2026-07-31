/**
 * Star rating display (spec 003, US2). Server-safe, no state.
 * Renders `rating` out of 5 with filled/empty stars and an accessible label.
 */
const STAR_PATH =
  "m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8Z";

export function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="stars" role="img" aria-label={`التقييم ${rating} من 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={size}
          height={size}
          aria-hidden="true"
          className={i <= rounded ? "on" : ""}
          fill={i <= rounded ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinejoin="round"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}
