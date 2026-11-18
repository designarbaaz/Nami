"use client";

import Script from "next/script";
import { useEffect } from "react";
import { EVENTS_DATA } from "@/content/home";

declare global {
  interface Window {
    __NAMI_EVENTS__?: typeof EVENTS_DATA;
    __NAMI_SITE_INIT__?: boolean;
    initNamiSite?: (events?: typeof EVENTS_DATA) => void;
  }
}

/** Injects event data + loads /assets/js/custom.js (init runs once). */
export default function SiteScripts() {
  useEffect(() => {
    window.__NAMI_EVENTS__ = EVENTS_DATA;
    window.initNamiSite?.(EVENTS_DATA);
  }, []);

  return (
    <Script
      src="/assets/js/custom.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.__NAMI_EVENTS__ = EVENTS_DATA;
        window.initNamiSite?.(EVENTS_DATA);
      }}
    />
  );
}
