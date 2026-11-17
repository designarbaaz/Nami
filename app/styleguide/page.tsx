import type { Metadata } from "next";
import StyleGuidePage from "@/components/StyleGuidePage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Brand Style Guide & Design System",
  description: `Official ${siteConfig.name} brand tokens, typography, color palette, and UI components.`,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/styleguide",
  },
};

export default function StyleGuide() {
  return <StyleGuidePage />;
}
