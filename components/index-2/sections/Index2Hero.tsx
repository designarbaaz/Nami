// @ts-nocheck
"use client";

export default function Index2Hero() {
  return (
    <>
      <section id="hero" className="hero-entrance">
          {/* Looping Loader Banner Video Background (Safari-Optimized, Audio-Free) */}
          <video className="hero-bg-media" autoPlay muted loop playsInline disablePictureInPicture preload="auto">
            <source src="/assets/Loader-banner.mp4" type="video/mp4" />
          </video>
      
          <div className="hero-content">
            {/* Short Subtitle Uppercase */}
            <p className="hero-welcome-strap">
              LISTENING BAR · DRINKS · FOOD
            </p>
          </div>
      
          {/* Scroll down indicator with custom wave arrow */}
          <a href="/#philosophy" className="hero-scroll-cue" aria-label="Scroll to explore">
            <img src="/assets/down-arrow-flat.svg" alt="Scroll Down" className="cue-wave-arrow" />
          </a>
        </section>
    </>
  );
}
