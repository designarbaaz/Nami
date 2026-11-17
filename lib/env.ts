/**
 * Env helpers — values come from `.env` only.
 *
 * IMPORTANT: Next.js only inlines NEXT_PUBLIC_* into the browser when accessed as
 * a static path: process.env.NEXT_PUBLIC_FOO
 * Dynamic process.env[name] is undefined on the client — never use that for public vars.
 */

function trim(value: string | undefined, fallback = ""): string {
  if (value === undefined || value === "") return fallback;
  return value.trim();
}

/** Server-only / next.config vars (dynamic access is fine — Node only). */
export function env(name: string, fallback = ""): string {
  return trim(process.env[name], fallback);
}

export function requireEnv(name: string): string {
  const value = env(name);
  if (!value) {
    throw new Error(
      `Missing required env var ${name}. Set it in .env for this environment.`
    );
  }
  return value;
}

/**
 * Public (browser-safe) env — static process.env access so Next can inline them.
 * Keep every NEXT_PUBLIC_* key listed here explicitly.
 */
export const publicEnv = {
  siteUrl: trim(process.env.NEXT_PUBLIC_SITE_URL),
  email: trim(process.env.NEXT_PUBLIC_SITE_EMAIL),
  location: trim(process.env.NEXT_PUBLIC_SITE_LOCATION),
  street: trim(process.env.NEXT_PUBLIC_SITE_STREET),
  locality: trim(process.env.NEXT_PUBLIC_SITE_LOCALITY),
  region: trim(process.env.NEXT_PUBLIC_SITE_REGION),
  postal: trim(process.env.NEXT_PUBLIC_SITE_POSTAL),
  country: trim(process.env.NEXT_PUBLIC_SITE_COUNTRY),
  instagram: trim(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
  whatsapp: trim(process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP),
  strapiUrl: trim(process.env.NEXT_PUBLIC_STRAPI_URL),
} as const;

export function siteUrlFromEnv(): string {
  const url = publicEnv.siteUrl;
  if (!url) {
    throw new Error(
      "Missing required env var NEXT_PUBLIC_SITE_URL. Set it in .env for this environment."
    );
  }
  return url.replace(/\/$/, "");
}

export function parsedSiteUrl(): URL | null {
  const siteUrl = publicEnv.siteUrl || env("NEXT_PUBLIC_SITE_URL");
  if (!siteUrl) return null;
  try {
    return new URL(siteUrl);
  } catch {
    return null;
  }
}

/** True when NEXT_PUBLIC_SITE_URL is https://… (staging/production). */
export function isHttpsSite(): boolean {
  const flag = env("FORCE_HTTPS").toLowerCase();
  if (flag === "true" || flag === "1") return true;
  if (flag === "false" || flag === "0") return false;
  return parsedSiteUrl()?.protocol === "https:";
}

export function isDevRuntime(): boolean {
  return process.env.NODE_ENV !== "production";
}

/** App listen port from `.env` only — no hardcoded default in code. */
export function portFromEnv(): string {
  return env("PORT");
}

/**
 * Hostnames/origins for Next.js allowedDevOrigins (used in `next dev`).
 * Built from NEXT_PUBLIC_SITE_URL + PORT in `.env` — never invents a port.
 */
export function allowedDevOriginsFromEnv(): string[] {
  const explicit = env("ALLOWED_DEV_ORIGINS");
  if (explicit) {
    return explicit
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const u = parsedSiteUrl();
  if (!u) return [];

  const origins = new Set<string>([u.host, u.origin]);

  const port = portFromEnv();
  if (port && !u.port) {
    origins.add(`${u.protocol}//${u.hostname}:${port}`);
  }

  return [...origins];
}

/**
 * Full CSP connect-src directive.
 * Protocol/host come from NEXT_PUBLIC_SITE_URL in `.env`.
 */
export function cspConnectSrcFromEnv(): string {
  const fullOverride = env("CSP_CONNECT_SRC");
  if (fullOverride) {
    return fullOverride.startsWith("connect-src")
      ? fullOverride
      : `connect-src ${fullOverride}`;
  }

  const parts = ["'self'"];
  const u = parsedSiteUrl();
  const extras = env("CSP_CONNECT_SRC_EXTRA");

  if (isDevRuntime()) {
    parts.push("ws:", "wss:");
    if (u) {
      parts.push(`${u.protocol}//${u.hostname}:*`);
    }
  }

  if (extras) {
    parts.push(
      ...extras
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }

  const strapi = publicEnv.strapiUrl.replace(/\/$/, "") || env("NEXT_PUBLIC_STRAPI_URL").replace(/\/$/, "");
  if (strapi) parts.push(strapi);

  return `connect-src ${[...new Set(parts)].join(" ")}`;
}

export function shouldEnableHsts(): boolean {
  if (!isHttpsSite()) return false;
  if (isDevRuntime()) return false;
  const flag = env("ENABLE_HSTS").toLowerCase();
  if (flag === "false" || flag === "0") return false;
  return true;
}

export function shouldUpgradeInsecureRequests(): boolean {
  return isHttpsSite();
}
