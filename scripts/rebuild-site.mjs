/**
 * Rebuild custom.css / custom.js / snippets from _legacy.
 * Homepage base = index.html (canonical).
 * Preserves Next-safe initNamiPageFeatures bootstrap.
 */
import fs from "node:fs";
import path from "node:path";

const map = JSON.parse(fs.readFileSync("scripts/asset-map.json", "utf8"));

function rewrite(text) {
  let out = text.replace(/(?:\.\/)?assets\//g, "/assets/");
  for (const [from, to] of Object.entries(map).sort(
    (a, b) => b[0].length - a[0].length
  )) {
    if (from === to) continue;
    out = out.split(from).join(to);
  }
  out = out.replace(
    /\/assets\/Noise-texture\.(?:png|avif)/gi,
    "/assets/noise-tile.png"
  );
  out = out.replace(/Menu-food\.webp/g, "Menu-food.avif");
  out = out.replace(/Menu-desserts\.webp/g, "Menu-desserts.avif");
  // HTML page links → Next routes
  out = out.replace(/thank-you\.html/g, "/thank-you");
  out = out.replace(/faqs\.html/g, "/faqs");
  out = out.replace(/concept\.html/g, "/concept");
  out = out.replace(/whats-on\.html/g, "/whats-on");
  out = out.replace(/drinks-food\.html/g, "/drinks-food");
  out = out.replace(/our-space\.html/g, "/our-space");
  // Design HTML still points "Home" at index-2.html — canonical home is /
  out = out.replace(/index-2\.html/g, "/");
  out = out.replace(/(?<![-\w])index\.html/g, "/");
  out = out.replace(/styleguide\.html/g, "/styleguide");
  out = out.replace(/404\.html/g, "/");
  // gradient PNGs → avif via map already
  return out;
}

function extractTag(html, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const parts = [];
  let m;
  while ((m = re.exec(html))) {
    const open = m[0].slice(0, m[0].indexOf(">") + 1);
    if (tag === "script" && /\ssrc\s*=/.test(open)) continue;
    parts.push(m[1]);
  }
  return parts.join("\n\n");
}

function sliceFromMarkers(css, markers) {
  const lines = css.split(/\r?\n/);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (markers.some((mk) => lines[i].includes(mk))) {
      start = i;
      break;
    }
  }
  if (start < 0) return "";
  return lines.slice(start).join("\n");
}

function extractFunctions(js, names) {
  const out = [];
  for (const name of names) {
    const re = new RegExp(
      `(?:async\\s+)?function\\s+${name}\\s*\\([\\s\\S]*?\\)\\s*\\{`,
      "m"
    );
    const m = re.exec(js);
    if (!m) continue;
    let i = m.index + m[0].length;
    let depth = 1;
    while (i < js.length && depth > 0) {
      const ch = js[i++];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
    }
    out.push(js.slice(m.index, i));
  }
  return out.join("\n\n");
}

function extractConstArray(js, name) {
  const re = new RegExp(`(?:const|let|var)\\s+${name}\\s*=\\s*\\[`, "m");
  const m = re.exec(js);
  if (!m) return "";
  let i = m.index + m[0].length;
  let depth = 1;
  while (i < js.length && depth > 0) {
    const ch = js[i++];
    if (ch === "[") depth++;
    else if (ch === "]") depth--;
  }
  while (i < js.length && /[\s;]/.test(js[i])) i++;
  return js.slice(m.index, i);
}

const indexHtml = fs.readFileSync("_legacy/index.html", "utf8");
let siteCss = extractTag(indexHtml, "style");
let siteJs = extractTag(indexHtml, "script");

// Reveal CSS early from concept (needed for pillars)
const conceptHtml = fs.readFileSync("_legacy/concept.html", "utf8");
const conceptCss = extractTag(conceptHtml, "style");
const revealMatch = conceptCss.match(
  /\.reveal-on-scroll\s*\{[\s\S]*?\}\s*\.reveal-on-scroll\.is-revealed\s*\{[\s\S]*?\}/
);
const revealBlock = revealMatch
  ? `\n/* REVEAL */\n${revealMatch[0]}\n`
  : `
.reveal-on-scroll { opacity: 0; transform: translateY(32px); transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1); }
.reveal-on-scroll.is-revealed { opacity: 1; transform: translateY(0); }
`;

const pageCssSpecs = [
  {
    file: "concept.html",
    label: "CONCEPT",
    markers: [".concept-hero-fold {", "HERO SECTION (FIRST FOLD"],
  },
  {
    file: "whats-on.html",
    label: "WHATS-ON",
    markers: [
      ".previous-events-section {",
      ".private-space-banner {",
      "PREVIOUS EVENTS",
      "PRIVATE",
    ],
  },
  {
    file: "drinks-food.html",
    label: "DRINKS-FOOD",
    markers: [".menu-page-hero {", "PAGE HERO HEADER"],
  },
  {
    file: "our-space.html",
    label: "OUR-SPACE",
    markers: [".gallery-page-wrap {", ".gallery-header-section {"],
  },
  {
    file: "faqs.html",
    label: "FAQS",
    markers: [".faq-section {", ".contact-section {", "FAQ"],
  },
  {
    file: "thank-you.html",
    label: "THANK-YOU",
    markers: [".thank-you", ".ty-", "THANK"],
  },
  {
    file: "404.html",
    label: "404",
    markers: [".error-stage", ".error-", "404"],
  },
  {
    file: "index-2.html",
    label: "INDEX-2 LIST",
    markers: [".event-list-section {", ".event-poster-preview-wrap {"],
  },
];

for (const spec of pageCssSpecs) {
  const html = fs.readFileSync(path.join("_legacy", spec.file), "utf8");
  const css = extractTag(html, "style");
  if (spec.file === "index-2.html") {
    if (!siteCss.includes(".event-list-section")) {
      const listStart = css.indexOf(".event-list-section");
      if (listStart >= 0) {
        let end = css.indexOf("SECTION: THE RESONANCE MENU", listStart);
        if (end < 0) end = Math.min(listStart + 14000, css.length);
        siteCss += `\n\n/* ========== ${spec.label} ========== */\n${css.slice(listStart, end)}`;
        console.log("appended index-2 list CSS");
      }
    }
    continue;
  }
  const slice = sliceFromMarkers(css, spec.markers);
  if (slice.trim()) {
    // Strip leading broken mid-comment text
    let clean = slice.replace(
      /^\s*[A-Z0-9][A-Z0-9 &\-().,/:]+\n\s*=+\s*\*\//m,
      "/* section */"
    );
    siteCss += `\n\n/* ========== ${spec.label} (from ${spec.file}) ========== */\n${clean}`;
    console.log(`appended CSS ${spec.file}`, clean.length);
  } else {
    console.warn("no CSS slice", spec.file);
  }
}

siteCss = revealBlock + "\n" + siteCss;

// Page JS
const pageJsSpecs = [
  {
    file: "concept.html",
    label: "CONCEPT",
    fns: [
      "initHorizontalPillarsScroll",
      "initImageRevealAnimation",
      "initWaveVideoSync",
      "switchSpecimen",
      "initSoundCarousel",
    ],
  },
  {
    file: "whats-on.html",
    label: "WHATS-ON",
    fns: [
      "initPrevEventsCarousel",
      "openContactModal",
      "closeContactModal",
      "handleContactSubmit",
    ],
  },
  {
    file: "index-2.html",
    label: "INDEX-2",
    fns: ["initEventListHover"],
  },
  {
    file: "drinks-food.html",
    label: "DRINKS-FOOD",
    fns: ["initMenuScrollSpy", "setActiveCategory", "syncCategoryFromScroll"],
  },
  {
    file: "our-space.html",
    label: "OUR-SPACE",
    fns: ["filterGallery"],
    consts: ["GALLERY_DATA"],
  },
  {
    file: "faqs.html",
    label: "FAQS",
    fns: ["initFaqAccordion", "handleEnquirySubmit"],
  },
  {
    file: "thank-you.html",
    label: "THANK-YOU",
    fns: ["populateThankYouContext"],
  },
];

for (const spec of pageJsSpecs) {
  const html = fs.readFileSync(path.join("_legacy", spec.file), "utf8");
  const js = extractTag(html, "script");
  const parts = [];
  if (spec.consts) {
    for (const c of spec.consts) {
      if (!siteJs.includes(c)) {
        const block = extractConstArray(js, c);
        if (block) parts.push(block);
      }
    }
  }
  const missing = (spec.fns || []).filter(
    (fn) => !siteJs.includes(`function ${fn}`)
  );
  if (missing.length) {
    const extracted = extractFunctions(js, missing);
    if (extracted) parts.push(extracted);
    const stillMissing = missing.filter((fn) => !extracted.includes(`function ${fn}`));
    if (stillMissing.length) console.warn("missing fns", spec.file, stillMissing);
  }
  if (parts.length) {
    siteJs += `\n\n/* ========== ${spec.label} ========== */\n${parts.join("\n\n")}`;
    console.log("appended JS", spec.label);
  }
}

if (siteJs.includes("GALLERY_DATA") && !siteJs.includes("let currentFilter")) {
  siteJs += `\nlet currentFilter = 'all';\nlet activeDataset = typeof GALLERY_DATA !== 'undefined' ? [...GALLERY_DATA] : [];\n`;
}

// Patch reservation submit to thank-you if still toast-only — append override
siteJs += `

/* ========== THANK-YOU REDIRECT HELPERS ========== */
window.namiGoThankYou = function(params) {
  var q = new URLSearchParams(params || {}).toString();
  window.location.href = '/thank-you' + (q ? ('?' + q) : '');
};
`;

// Next-safe bootstrap
siteJs += `
/* ========== PAGE BOOTSTRAPS (Next.js-safe) ========== */
(function () {
  function safe(fn) { try { fn(); } catch (e) { console.warn('[nami]', e); } }
  window.__namiPageCleanup = window.__namiPageCleanup || [];
  window.cleanupNamiPageFeatures = function () {
    (window.__namiPageCleanup || []).forEach(function (fn) { try { fn(); } catch (e) {} });
    window.__namiPageCleanup = [];
  };
  window.initNamiPageFeatures = function () {
    window.cleanupNamiPageFeatures();
    safe(function () { if (typeof initHorizontalPillarsScroll === 'function' && document.getElementById('pillarsPinnedContainer')) initHorizontalPillarsScroll(); });
    safe(function () { if (typeof initImageRevealAnimation === 'function' && document.querySelector('.reveal-on-scroll')) initImageRevealAnimation(); });
    safe(function () { if (typeof initWaveVideoSync === 'function' && document.querySelector('.wave-video-strap video')) initWaveVideoSync(); });
    safe(function () { if (typeof initMenuScrollSpy === 'function' && document.getElementById('menuPanels')) initMenuScrollSpy(); });
    // Gallery: keep the static server-rendered rows (matches live); filterGallery runs only on pill clicks.
    safe(function () { if (typeof initEventListHover === 'function' && document.querySelector('.event-list-row')) initEventListHover(); });
    safe(function () { if (typeof initFaqAccordion === 'function' && document.querySelector('.faq-item, .faq-accordion')) initFaqAccordion(); });
    safe(function () { if (typeof initSoundCarousel === 'function' && document.getElementById('soundCarousel')) initSoundCarousel(); });
    safe(function () { if (typeof initPrevEventsCarousel === 'function' && document.getElementById('prevEventsTrack')) initPrevEventsCarousel(); });
    safe(function () { if (typeof populateThankYouContext === 'function' && document.getElementById('tySubtitle')) populateThankYouContext(); });
    document.querySelectorAll('video.wave-strap-media, video.hero-bg-media, video.splash-video').forEach(function (v) {
      try { v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function(){}); } catch (e) {}
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { window.initNamiPageFeatures(); });
  } else {
    window.initNamiPageFeatures();
  }
})();
`;

const sg = fs.readFileSync("_legacy/styleguide.html", "utf8");
fs.mkdirSync("public/assets/css", { recursive: true });
fs.mkdirSync("public/assets/js", { recursive: true });
// Logo: drop-shadow for contrast on busy hero/banners (from concept.html)
if (!siteCss.includes("drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))")) {
  siteCss = siteCss.replace(
    /(\.brand-mark-img\s*\{[^}]*transition:[^;]+;)/,
    "$1\n      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6));"
  );
}

// Velvet canvas must not inherit .btn-cta-primary > * { position: relative }
if (!siteCss.includes("[data-velvet-btn] > .nami-velvet-canvas")) {
  siteCss += `
/* Velvet canvas layout guard */
.btn-cta-primary > .nami-velvet-canvas,
[data-velvet-btn] > .nami-velvet-canvas {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: -1 !important;
  pointer-events: none !important;
}
[data-velvet-btn] > *:not(.nami-velvet-canvas) {
  position: relative;
  z-index: 1;
}
.drawer-nav-item:hover,
.drawer-nav-item.active {
  color: var(--c-orange);
  transform: translateX(12px);
}
`;
}

// Logo visibility: only hide on home hero; keep visible on inner pages
siteJs = siteJs.replace(
  /\/\/ Show small brand mark in top-left when scrolling past hero\s*\n\s*if \(scrollY > 400\) \{\s*\n\s*brandMark\.classList\.add\('visible'\);\s*\n\s*\} else \{\s*\n\s*brandMark\.classList\.remove\('visible'\);\s*\n\s*\}/,
  `// Home: fade logo in after scrolling past hero.
      // Inner pages: keep logo always visible (matches legacy page CSS).
      if (brandMark) {
        const onHomeHero = !!document.getElementById('hero');
        if (!onHomeHero || scrollY > 400) {
          brandMark.classList.add('visible');
        } else {
          brandMark.classList.remove('visible');
        }
      }`
);

fs.writeFileSync("public/assets/css/custom.css", rewrite(siteCss));
fs.writeFileSync("public/assets/js/custom.js", rewrite(siteJs));
fs.writeFileSync(
  "public/assets/css/styleguide.css",
  rewrite(extractTag(sg, "style"))
);

// Velvet buttons
if (fs.existsSync("_legacy/assets/nami-velvet-buttons.js")) {
  const velvet = fs.readFileSync("_legacy/assets/nami-velvet-buttons.js", "utf8");
  fs.writeFileSync(
    "public/assets/js/nami-velvet-buttons.js",
    rewrite(velvet)
  );
  console.log("copied nami-velvet-buttons.js");
}

console.log(
  "custom.css",
  siteCss.length,
  "custom.js",
  siteJs.length,
  "calendar",
  siteCss.includes("event-calendar-section"),
  "faq",
  siteCss.includes("faq-section") || siteCss.includes(".faq-"),
  "thank",
  siteCss.includes("thank") || siteCss.includes(".ty-"),
  "404",
  siteCss.includes("error-stage") || siteCss.includes("404"),
  "reveal",
  siteCss.includes("reveal-on-scroll"),
  "initNami",
  siteJs.includes("initNamiPageFeatures")
);

// Dump snippets
const snip = "scripts/_snippets";
fs.mkdirSync(snip, { recursive: true });

function dumpSection(html, id, outName) {
  const re = new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?<\\/section>`, "i");
  const m = re.exec(html);
  if (m) {
    fs.writeFileSync(path.join(snip, outName), rewrite(m[0]));
    console.log("snippet", outName, m[0].length);
  }
}

for (const id of [
  "hero",
  "philosophy",
  "programming",
  "menu",
  "space",
  "press",
  "instagram",
]) {
  dumpSection(indexHtml, id, `index-${id}.html`);
}

const wave = /<div class="wave-video-strap"[\s\S]*?<div class="wave-strap-overlay"><\/div>\s*<\/div>/.exec(
  indexHtml
);
if (wave)
  fs.writeFileSync(path.join(snip, "index-wave.html"), rewrite(wave[0]));

const splash = /<div id="splashScreen"[\s\S]*?<\/div>\s*<\/div>/.exec(indexHtml);
if (splash)
  fs.writeFileSync(path.join(snip, "index-splash.html"), rewrite(splash[0]));

const header = /<header class="site-header">[\s\S]*?<\/header>/i.exec(indexHtml);
if (header)
  fs.writeFileSync(path.join(snip, "index-header.html"), rewrite(header[0]));

const drawer =
  /<div id="menuDrawer"[\s\S]*?(?=<div id="splashScreen"|<section id="hero")/i.exec(
    indexHtml
  );
if (drawer)
  fs.writeFileSync(path.join(snip, "index-drawer.html"), rewrite(drawer[0]));

const footer = /<footer class="site-footer"[\s\S]*?<\/footer>/i.exec(indexHtml);
if (footer)
  fs.writeFileSync(path.join(snip, "index-footer.html"), rewrite(footer[0]));

for (const file of [
  "concept.html",
  "whats-on.html",
  "drinks-food.html",
  "our-space.html",
  "faqs.html",
  "thank-you.html",
  "404.html",
  "styleguide.html",
]) {
  const html = fs.readFileSync(path.join("_legacy", file), "utf8");
  const main = /<main[\s\S]*?<\/main>/i.exec(html);
  const body = main
    ? main[0]
    : (/<body[^>]*>([\s\S]*?)<\/body>/i.exec(html) || [])[1] || "";
  fs.writeFileSync(
    path.join(snip, file.replace(".html", ".main.html")),
    rewrite(body)
  );
  console.log("snippet main", file);
}

// index-2 programming list for /index-2
const i2 = fs.readFileSync("_legacy/index-2.html", "utf8");
dumpSection(i2, "programming", "programming.html");
dumpSection(i2, "hero", "hero.html");
for (const id of ["philosophy", "menu", "space", "press", "instagram"]) {
  dumpSection(i2, id, `${id}.html`);
}
