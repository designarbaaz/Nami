import type { Metadata } from "next";
import Index2Page from "@/components/index-2/Index2Page";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/index-2"),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Index2Route() {
  return <Index2Page />;
}
