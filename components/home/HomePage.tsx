"use client";

import Hero from "./sections/Hero";
import AudioWidget from "./sections/AudioWidget";
import Philosophy from "./sections/Philosophy";
import Programming from "./sections/Programming";
import MenuSection from "./sections/MenuSection";
import Space from "./sections/Space";

/**
 * Homepage sections only.
 * Header / Footer / Overlays / Modals are global via SiteShell.
 *
 * Customize:
 *   public/assets/css/custom.css
 *   public/assets/js/custom.js
 *   content/home.ts
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AudioWidget />

      <main className="page-wrap">
        <Philosophy />
        <Programming />
        <MenuSection />
        <Space />
      </main>
    </>
  );
}
