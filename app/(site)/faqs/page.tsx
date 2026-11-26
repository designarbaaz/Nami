import type { Metadata } from "next";
import FaqsPage from "@/components/faqs/FaqsPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about Nami — reservations, listening sessions, dress code, and visiting our Bandra West hi-fi room.",
  alternates: { canonical: absoluteUrl("/faqs") },
};

export default function FaqsRoute() {
  return <FaqsPage />;
}
