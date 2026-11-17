import type { NextConfig } from "next";
import {
  allowedDevOriginsFromEnv,
  cspConnectSrcFromEnv,
  isDevRuntime,
  shouldEnableHsts,
  shouldUpgradeInsecureRequests,
} from "./lib/env";

const isDev = isDevRuntime();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // From ALLOWED_DEV_ORIGINS or NEXT_PUBLIC_SITE_URL + PORT
  allowedDevOrigins: allowedDevOriginsFromEnv(),
  async headers() {
    const securityHeaders = [
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      {
        key: "X-XSS-Protection",
        value: "0",
      },
    ];

    // Only when NEXT_PUBLIC_SITE_URL is https:// (staging/production)
    if (shouldEnableHsts()) {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    const cspParts = [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob:",
      "font-src 'self' https://use.typekit.net https://p.typekit.net https://fonts.gstatic.com data:",
      "style-src 'self' 'unsafe-inline' https://use.typekit.net https://p.typekit.net https://fonts.googleapis.com",
      "script-src 'self' 'unsafe-inline'" + (isDev ? " 'unsafe-eval'" : ""),
      cspConnectSrcFromEnv(),
    ];

    if (shouldUpgradeInsecureRequests()) {
      cspParts.push("upgrade-insecure-requests");
    }

    securityHeaders.push({
      key: "Content-Security-Policy",
      value: cspParts.join("; "),
    });

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: isDev
              ? "no-cache"
              : "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
