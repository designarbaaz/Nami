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
  return (
    <>
      <link rel="preload" href="/assets/css/custom.css" as="style" />
      <link rel="stylesheet" href="/assets/css/custom.css" />
      <link rel="preload" href="/assets/noise-tile.png" as="image" />
      <link
        rel="preload"
        href="/assets/vinyl-loop.mp4"
        as="video"
        type="video/mp4"
      />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
