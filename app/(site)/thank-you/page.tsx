import type { Metadata } from "next";
import ThankYouPage from "@/components/thank-you/ThankYouPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your request was received — we’ll be in touch soon.",
  alternates: { canonical: absoluteUrl("/thank-you") },
  robots: { index: false, follow: false },
};

export default function ThankYouRoute() {
  return <ThankYouPage />;
}
