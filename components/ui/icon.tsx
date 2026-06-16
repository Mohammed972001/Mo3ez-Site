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
  whatsapp: <path d="M20.5 3.5A11 11 0 0 0 3.2 17L2 22l5.2-1.2A11 11 0 1 0 20.5 3.5ZM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.6.6.6-2.5-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1c.5-.1 1.4-.6 1.6-1.1a2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3Z" />,
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
      className={className}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
