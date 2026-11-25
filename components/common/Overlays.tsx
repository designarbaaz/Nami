// @ts-nocheck
"use client";

import { usePathname } from "next/navigation";

export default function Overlays() {
  const pathname = usePathname() || "/";
  const showSplash = pathname === "/";

  return (
    <>
      {/* Splash only on canonical homepage (index.html) */}
      {showSplash ? (
        <div
          id="splashScreen"
          className="splash-screen"
          onClick={() => {
            (window as any).dismissSplashScreen?.();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Loading NAMI"
        >
          <div className="splash-center">
            <video
              id="splashVideo"
              className="splash-video"
              autoPlay
              muted
              playsInline
              disablePictureInPicture
              preload="auto"
            >
              <source src="/assets/loader-1.mp4" type="video/mp4" />
            </video>
            <span className="splash-enter-text">Enter the Experience</span>
          </div>
        </div>
      ) : null}

      <div id="noise-layer"></div>
      <div id="warmth-layer"></div>
      <div id="toast">Copied to clipboard</div>
    </>
  );
}
