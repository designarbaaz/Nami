import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { env, isDevRuntime } from "@/lib/env";

/**
 * Staging tip: set NEXT_PUBLIC_SITE_INDEXING=false so search engines skip the site
 * until launch. Production should leave it unset or true.
 */
export default function robots(): MetadataRoute.Robots {
  const indexingFlag = env("NEXT_PUBLIC_SITE_INDEXING", "true").toLowerCase();
  const allowIndexing =
    !isDevRuntime() && indexingFlag !== "false" && indexingFlag !== "0";

  if (!allowIndexing) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      host: siteConfig.url,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/styleguide", "/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
