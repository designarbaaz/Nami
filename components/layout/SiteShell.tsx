import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Overlays from "@/components/common/Overlays";
import Modals from "@/components/common/Modals";
import SiteScripts from "@/components/layout/SiteScripts";

/**
 * Global chrome for all (site) pages:
 * overlays + header + page + footer + reserve/menu modals + scripts.
 * Styleguide is outside this shell on purpose.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/custom.css" />
      <Overlays />
      <Header />
      {children}
      <Footer />
      <Modals />
      <SiteScripts />
    </>
  );
}
