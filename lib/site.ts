/**
 * Site config — frontend today, Strapi/CMS-ready tomorrow.
 * Prefer env vars so local / staging / production stay simple.
 */
export const siteConfig = {
  name: "NAMI",
  tagline: "Hi-Fi Listening Room & Dining Experience",
  description:
    "Part listening room, part cocktail bar, part dining experience. An intimate sanctuary where sound, flavour, and nocturnal culture collide on their own frequency.",
  locale: "en_IN",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://nami.localhost:3000",
  email: "experience@nami.in",
  location: "Bandra West, Mumbai, Maharashtra 400050",
  social: {
    instagram: "https://instagram.com/",
    whatsapp: "https://chat.whatsapp.com/",
  },
} as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url;
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
