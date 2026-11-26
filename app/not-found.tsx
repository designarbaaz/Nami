import NotFoundPage from "@/components/not-found/NotFoundPage";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Overlays from "@/components/common/Overlays";
import Modals from "@/components/common/Modals";
import SiteScripts from "@/components/layout/SiteScripts";

export default function NotFound() {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/custom.css" />
      <Overlays />
      <Header />
      <NotFoundPage />
      <Footer />
      <Modals />
      <SiteScripts />
    </>
  );
}
