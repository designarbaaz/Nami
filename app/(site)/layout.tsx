import SiteShell from "@/components/layout/SiteShell";

/**
 * Site pages share Header, Footer, overlays, custom.css, and custom.js.
 * Styleguide lives outside this group and is unchanged.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
