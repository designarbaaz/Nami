// @ts-nocheck
"use client";

import "@/styles/home.css";
import { useHomeInteractions } from "./useHomeInteractions";
import Overlays from "./sections/Overlays";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import AudioWidget from "./sections/AudioWidget";
import Philosophy from "./sections/Philosophy";
import Programming from "./sections/Programming";
import MenuSection from "./sections/MenuSection";
import Space from "./sections/Space";
import Faqs from "./sections/Faqs";
import Reserve from "./sections/Reserve";
import Footer from "./sections/Footer";

/**
 * Homepage — change section order here.
 *
 * Customize:
 * - Markup → components/home/sections/*
 * - Behaviour → useHomeInteractions.ts
 * - Content/data → content/home.ts
 * - New HTML drops → put in _legacy/, then port into the matching section file
 */
export default function HomePage() {
  useHomeInteractions();

  return (
    <>
      <Overlays />
      <Header />
      <Hero />
      <AudioWidget />

      <main className="page-wrap">
        <Philosophy />
        <Programming />
        <MenuSection />
        <Space />
        <Faqs />
        <Reserve />
      </main>

      <Footer />
    </>
  );
}
