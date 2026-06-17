import type { SVGProps } from "react";

/* مجموعة أيقونات خطّية موحّدة (stroke 1.75) — منقولة من نظام التصميم.
   تُرسم بـ currentColor فترث لون النص. */
const PATHS = {
  search: <><path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path d="m21 21-4.3-4.3" /></>,
  heart: <path d="M12 20.5 4.5 13a5 5 0 0 1 7-7l.5.5.5-.5a5 5 0 0 1 7 7Z" />,
  cart: <><path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 8H6" /><circle cx="9.5" cy="20.5" r="1.2" /><circle cx="17.5" cy="20.5" r="1.2" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></>,
  chevDown: <path d="m6 9 6 6 6-6" />,
  chevLeft: <path d="m15 6-6 6 6 6" />,
  chevRight: <path d="m9 6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  x: <path d="M6 6 18 18M18 6 6 18" />,
  check: <path d="m5 12 5 5L20 6" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
  filter: <path d="M3 5h18M6 12h12M10 19h4" />,
  star: <path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8Z" />,
  truck: <><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></>,
  shield: <path d="M12 3 5 6v5c0 4.2 2.9 7.8 7 9 4.1-1.2 7-4.8 7-9V6Z" />,
  ruler: <><path d="M3 8h18v8H3z" /><path d="M7 8v3M11 8v4M15 8v3M19 8v4" /></>,
  bag: <><path d="M6 8h12l-1 12H7Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  trash: <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  swatch: <><circle cx="8" cy="8" r="4" /><circle cx="16" cy="8" r="4" /><circle cx="12" cy="15" r="4" /></>,
  sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /><path d="m6 6 3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" /></>,
  arrowL: <path d="M19 12H5M11 6l-6 6 6 6" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  // أيقونة واتساب الرسمية (مملوءة) — تتجاوز fill:none عبر fill/stroke الخاصّين بها.
  whatsapp: (
    <path
      fill="currentColor"
      stroke="none"
      d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.043zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
    />
  ),
  phone: <path d="M5 4h4l1 5-2.5 1.5a11 11 0 0 0 5 5L20 13l1 4v3a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />,
  location: <><path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
}

export function Icon({ name, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="1em"
      height="1em"
      className={className}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
