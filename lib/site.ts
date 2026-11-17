/**
 * Site config — brand constants in code; environment values only from `.env`.
 * Uses publicEnv (static NEXT_PUBLIC_* access) so values work in the browser.
 */
import { publicEnv, siteUrlFromEnv } from "@/lib/env";

export const siteConfig = {
  // Brand (same across envs unless you later move these to CMS/Strapi)
  name: "NAMI",
  tagline: "Hi-Fi Listening Room & Dining Experience",
  description:
    "Part listening room, part cocktail bar, part dining experience. An intimate sanctuary where sound, flavour, and nocturnal culture collide on their own frequency.",
  locale: "en_IN",

  // Environment-specific (.env → NEXT_PUBLIC_*)
  url: siteUrlFromEnv(),
  email: publicEnv.email,
  location: publicEnv.location,
  address: {
    street: publicEnv.street,
    locality: publicEnv.locality,
    region: publicEnv.region,
    postal: publicEnv.postal,
    country: publicEnv.country,
  },
  social: {
    instagram: publicEnv.instagram,
    whatsapp: publicEnv.whatsapp,
  },
} as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url;
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
