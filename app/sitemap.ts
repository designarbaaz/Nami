import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/concept"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/whats-on"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/drinks-food"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/our-space"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/faqs"), lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
