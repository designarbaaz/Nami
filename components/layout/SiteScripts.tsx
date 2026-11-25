"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __NAMI_SITE_INIT__?: boolean;
    initNamiSite?: () => void;
    initNamiPageFeatures?: () => void;
    cleanupNamiPageFeatures?: () => void;
  }
}

/**
 * Loads /assets/js/custom.js and re-runs page feature inits on every route change.
 * (DOMContentLoaded only fires once — Next client navigations need an explicit re-init.)
 */
export default function SiteScripts() {
  const pathname = usePathname();

  useEffect(() => {
    // Defer one frame so new page DOM is committed
    const id = window.requestAnimationFrame(() => {
      window.initNamiPageFeatures?.();
    });
    return () => {
      window.cancelAnimationFrame(id);
      window.cleanupNamiPageFeatures?.();
    };
  }, [pathname]);

  return (
    <Script
      src="/assets/js/custom.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.initNamiSite?.();
        window.initNamiPageFeatures?.();
      }}
    />
  );
}
