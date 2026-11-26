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
    initVelvetButtons?: () => void;
    NamiVelvet?: { init?: () => void };
  }
}

/**
 * Loads custom.js + velvet CTAs; re-runs page feature inits on every route change.
 */
export default function SiteScripts() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const run = () => {
      if (cancelled) return;
      if (typeof window.initNamiPageFeatures === "function") {
        window.initNamiPageFeatures();
        return;
      }
      // custom.js may still be loading on first paint
      if (attempts++ < 20) window.setTimeout(run, 50);
    };
    const id = window.requestAnimationFrame(run);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
      window.cleanupNamiPageFeatures?.();
    };
  }, [pathname]);

  return (
    <>
      <Script
        src="/assets/js/nami-velvet-buttons.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/custom.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.initNamiSite?.();
          window.initNamiPageFeatures?.();
        }}
      />
    </>
  );
}
