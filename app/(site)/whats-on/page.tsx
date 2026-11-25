import type { Metadata } from "next";
import WhatsOnPage from "@/components/whats-on/WhatsOnPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "What’s On",
  description:
    "Curated vinyl archives, selector sessions and Tokyo listening-room culture at Nami Bandra West.",
  alternates: { canonical: absoluteUrl("/whats-on") },
};

export default function WhatsOnRoute() {
  return <WhatsOnPage />;
}
