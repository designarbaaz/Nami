"use client";

import Philosophy from "@/components/home/sections/Philosophy";
import MenuSection from "@/components/home/sections/MenuSection";
import Space from "@/components/home/sections/Space";
import Press from "@/components/home/sections/Press";
import InstagramStrap from "@/components/home/sections/InstagramStrap";
import Index2Hero from "./sections/Index2Hero";
import EventListProgramming from "./sections/EventListProgramming";

/**
 * Alternate homepage from index-2.html (event list, Loader-banner hero, no splash).
 * Canonical home is `/` from index.html.
 * Audio widget lives in SiteShell (all pages).
 */
export default function Index2Page() {
  return (
    <>
      <Index2Hero />

      <main className="page-wrap">
        <Philosophy />
        <EventListProgramming />
        <MenuSection />
        <Space />
        <Press />
        <InstagramStrap />
      </main>
    </>
  );
}
