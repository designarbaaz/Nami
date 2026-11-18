/**
 * Styleguide-only chrome — loads its CSS in head to avoid FOUC.
 * Does not use SiteShell (no main site header/footer).
 */
export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/styleguide.css" />
      {children}
    </>
  );
}
