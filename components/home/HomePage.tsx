"use client";

import Hero from "./sections/Hero";
import Philosophy from "./sections/Philosophy";
import Programming from "./sections/Programming";
import MenuSection from "./sections/MenuSection";
import Space from "./sections/Space";
import Press from "./sections/Press";
import InstagramStrap from "./sections/InstagramStrap";

/**
 * Canonical homepage from index.html (matches https://nami.reputationindia.in/).
 * Alternate list variant: /index-2 (index-2.html).
 * Audio widget lives in SiteShell (all pages).
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      <main className="page-wrap">
        <Philosophy />
        <Programming />
        <MenuSection />
        <Space />
        <Press />
        <InstagramStrap />
      </main>
    </>
  );
}
