import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { siteConfig, absoluteUrl } from "@/lib/site";

/**
 * Route: /
 * Section order is controlled inside HomePage.
 */
export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    url: absoluteUrl("/"),
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/assets/hero-ref.jpg"),
        width: 1200,
        height: 630,
        alt: "NAMI hi-fi listening room",
      },
    ],
  },
};

export default function Home() {
  return <HomePage />;
}
