import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Local custom host + staging hostnames
  allowedDevOrigins: ["nami.localhost", "http://nami.localhost:3000"],
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

    if (!isDev) {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    // CSP kept practical for Typekit + Google Fonts + inline legacy page scripts
    securityHeaders.push({
      key: "Content-Security-Policy",
      value: [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'",
        "object-src 'none'",
        "img-src 'self' data: blob: https:",
        "media-src 'self' blob:",
        "font-src 'self' https://use.typekit.net https://fonts.gstatic.com data:",
        "style-src 'self' 'unsafe-inline' https://use.typekit.net https://fonts.googleapis.com",
        "script-src 'self' 'unsafe-inline'" + (isDev ? " 'unsafe-eval'" : ""),
        "connect-src 'self'" + (isDev ? " ws: wss: http://nami.localhost:*" : ""),
        "upgrade-insecure-requests",
      ]
        .join("; ")
        .replace(/upgrade-insecure-requests/, isDev ? "" : "upgrade-insecure-requests")
        .replace(/; ;/g, ";")
        .replace(/;\s*$/, ""),
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
