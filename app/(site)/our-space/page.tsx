import type { Metadata } from "next";
import OurSpacePage from "@/components/our-space/OurSpacePage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Space",
  description:
    "Explore Nami’s rotary audio architecture, vinyl archives, dining rooms and atmospheric bar.",
  alternates: { canonical: absoluteUrl("/our-space") },
};

export default function OurSpaceRoute() {
  return <OurSpacePage />;
}
