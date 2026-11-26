import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Overlays from "@/components/common/Overlays";
import Modals from "@/components/common/Modals";
import SiteScripts from "@/components/layout/SiteScripts";
import AudioWidget from "@/components/home/sections/AudioWidget";

/**
 * Global chrome for all (site) pages:
 * overlays + header + page + footer + audio + reserve/menu modals + scripts.
 * Styleguide is outside this shell on purpose.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Overlays />
      <Header />
      {children}
      <Footer />
      <AudioWidget />
      <Modals />
      <SiteScripts />
    </>
  );
}
