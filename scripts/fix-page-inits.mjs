/**
 * Fix inner-page interactions for Next.js:
 * 1) Inject missing reveal-on-scroll CSS (was above concept page slice marker)
 * 2) Replace DOMContentLoaded-only bootstraps with immediate + re-callable init
 */
import fs from "node:fs";

const cssPath = "public/assets/css/custom.css";
const jsPath = "public/assets/js/custom.js";

let css = fs.readFileSync(cssPath, "utf8");
const revealBlock = `
/* ========== REVEAL / FADE-UP (from concept.html — required for pillars & features) ========== */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.reveal-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
`;

if (!css.includes(".reveal-on-scroll.is-revealed")) {
  const marker = "/* ========== CONCEPT PAGE";
  const idx = css.indexOf(marker);
  if (idx >= 0) css = css.slice(0, idx) + revealBlock + "\n" + css.slice(idx);
  else css += revealBlock;
  console.log("injected reveal-on-scroll CSS");
} else {
  console.log("reveal CSS already present");
}

// Soft-fix truncated comment lines that are not valid CSS selectors
css = css.replace(
  /\n\s+HERO SECTION \(FIRST FOLD[\s\S]*?=========================================================\s*\*\//,
  "\n/* CONCEPT HERO */"
);
css = css.replace(
  /\n\s+PAGE HERO HEADER \(MINIMAL EDITORIAL\)[\s\S]*?(?=\n\s*\.menu-page-hero)/,
  "\n/* DRINKS-FOOD HERO */\n"
);
css = css.replace(
  /\n\s+PAGE CONTENT: OUR SPACE GALLERY[\s\S]*?(?=\n\s*\.gallery-)/,
  "\n/* OUR-SPACE GALLERY */\n"
);
css = css.replace(
  /\n\s*02\. PREVIOUS EVENTS SECTION[\s\S]*?(?=\n\s*\.previous-events)/,
  "\n/* PREVIOUS EVENTS */\n"
);

fs.writeFileSync(cssPath, css);
console.log("custom.css updated", css.length);

let js = fs.readFileSync(jsPath, "utf8");

// Make pillars/zigzag/reveal idempotent via data flags + AbortControllers stored on window
const bootstrap = `
/* ========== PAGE BOOTSTRAPS (Next.js-safe: callable after load + on route change) ========== */
(function () {
  function safe(fn) { try { fn(); } catch (e) { console.warn('[nami]', e); } }

  window.__namiPageCleanup = window.__namiPageCleanup || [];

  window.cleanupNamiPageFeatures = function cleanupNamiPageFeatures() {
    (window.__namiPageCleanup || []).forEach(function (fn) {
      try { fn(); } catch (e) {}
    });
    window.__namiPageCleanup = [];
  };

  window.initNamiPageFeatures = function initNamiPageFeatures() {
    // Always cleanup previous page bindings first (SPA navigations)
    window.cleanupNamiPageFeatures();

    safe(function () {
      if (typeof initHorizontalPillarsScroll === 'function' && document.getElementById('pillarsPinnedContainer')) {
        initHorizontalPillarsScroll();
      }
    });
    safe(function () {
      if (typeof initImageRevealAnimation === 'function' && document.querySelector('.reveal-on-scroll')) {
        initImageRevealAnimation();
      }
    });
    safe(function () {
      if (typeof initZigZagParallax === 'function' && document.querySelector('.feature-edge-row')) {
        initZigZagParallax();
      }
    });
    safe(function () {
      if (typeof initWaveVideoSync === 'function' && document.querySelector('.wave-video-strap video')) {
        initWaveVideoSync();
      }
    });
    safe(function () {
      if (typeof initMenuScrollSpy === 'function' && document.getElementById('menuPanels')) {
        initMenuScrollSpy();
      }
    });
    safe(function () {
      if (typeof filterGallery === 'function' && document.getElementById('galleryStripsContainer')) {
        filterGallery('all');
      }
    });
    safe(function () {
      if (typeof initEventListHover === 'function' && document.querySelector('.event-list-row')) {
        initEventListHover();
      }
    });
    safe(function () {
      if (typeof initMediaSlider === 'function' && document.getElementById('mediaSliderContainer')) {
        // media slider self-inits via IIFE on first parse; re-call only if exposed
        if (!document.getElementById('mediaSliderContainer').dataset.namiInited) {
          document.getElementById('mediaSliderContainer').dataset.namiInited = '1';
        }
      }
    });

    // Ensure wave / hero videos play after client nav
    document.querySelectorAll('video.wave-strap-media, video.hero-bg-media, video.splash-video').forEach(function (v) {
      try { v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
    });
  };

  // Run once when script evaluates (DOM usually ready under Next afterInteractive)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.initNamiPageFeatures();
    });
  } else {
    window.initNamiPageFeatures();
  }
})();
`;

// Remove old bootstrap block
js = js.replace(
  /\/\* ========== PAGE BOOTSTRAPS[\s\S]*$/,
  ""
);
js = js.trimEnd() + "\n\n" + bootstrap + "\n";

// Patch initHorizontalPillarsScroll to register cleanup and avoid duplicate listeners
js = js.replace(
  /function initHorizontalPillarsScroll\(\) \{[\s\S]*?window\.addEventListener\('scroll', onScroll, \{ passive: true \}\);\s*window\.addEventListener\('resize', onScroll\);\s*updatePillarsTranslate\(\);\s*\}/,
  `function initHorizontalPillarsScroll() {
      const container = document.getElementById('pillarsPinnedContainer');
      const track = document.getElementById('pillarsTrack');
      if (!container || !track) return;

      let ticking = false;

      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(() => {
            updatePillarsTranslate();
            ticking = false;
          });
          ticking = true;
        }
      }

      function updatePillarsTranslate() {
        if (window.innerWidth <= 860) {
          track.style.transform = 'none';
          return;
        }

        const rect = container.getBoundingClientRect();
        const totalScroll = container.offsetHeight - window.innerHeight;
        if (totalScroll <= 0) return;

        const scrollPassed = -rect.top;
        const progress = Math.min(Math.max(scrollPassed / totalScroll, 0), 1);

        const maxScroll = track.scrollWidth - window.innerWidth;
        if (maxScroll > 0) {
          const translateX = progress * maxScroll;
          track.style.transform = 'translateX(-' + translateX + 'px)';
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      if (window.__namiPageCleanup) {
        window.__namiPageCleanup.push(function () {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        });
      }
      updatePillarsTranslate();
    }`
);

js = js.replace(
  /function initZigZagParallax\(\) \{[\s\S]*?window\.addEventListener\('scroll', onScroll, \{ passive: true \}\);\s*window\.addEventListener\('resize', onScroll, \{ passive: true \}\);\s*updateParallax\(\);\s*\}/,
  `function initZigZagParallax() {
      const rows = Array.from(document.querySelectorAll('.feature-edge-row'));
      if (!rows.length) return;

      let ticking = false;

      function updateParallax() {
        const winHeight = window.innerHeight;
        const screenCenter = winHeight / 2;

        rows.forEach(row => {
          const media = row.querySelector('.feature-edge-media');
          const img = row.querySelector('.feature-edge-media img');
          if (!media || !img) return;

          const rect = media.getBoundingClientRect();
          if (rect.bottom > -100 && rect.top < winHeight + 100) {
            const mediaCenter = rect.top + rect.height / 2;
            const offset = (mediaCenter - screenCenter) * -0.14;
            const clamped = Math.max(-68, Math.min(68, offset));
            img.style.transform = 'translate3d(0, ' + clamped.toFixed(1) + 'px, 0)';
          }
        });
      }

      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
          });
          ticking = true;
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      if (window.__namiPageCleanup) {
        window.__namiPageCleanup.push(function () {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        });
      }
      updateParallax();
    }`
);

fs.writeFileSync(jsPath, js);
console.log("custom.js updated", js.length);
console.log("has initNamiPageFeatures", js.includes("initNamiPageFeatures"));
console.log("has reveal CSS", css.includes(".reveal-on-scroll.is-revealed"));
