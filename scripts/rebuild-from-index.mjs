/**
 * Rebuild site CSS/JS with index.html as homepage base,
 * then regenerate home section TSX from index-* snippets.
 * Keeps page-specific CSS/JS for concept/whats-on/drinks-food/our-space.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

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
  // Menu sheets
  out = out.replace(/Menu-food\.webp/g, "Menu-food.avif");
  out = out.replace(/Menu-desserts\.webp/g, "Menu-desserts.avif");
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

function extractConstObject(js, name) {
  const re = new RegExp(`(?:const|let|var)\\s+${name}\\s*=\\s*\\{`, "m");
  const m = re.exec(js);
  if (!m) return "";
  let i = m.index + m[0].length;
  let depth = 1;
  while (i < js.length && depth > 0) {
    const ch = js[i++];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
  }
  while (i < js.length && /[\s;]/.test(js[i])) i++;
  return js.slice(m.index, i);
}

// 1) Extract index snippets
spawnSync(process.execPath, ["scripts/extract-index-home.mjs"], {
  stdio: "inherit",
});

const indexHtml = fs.readFileSync("_legacy/index.html", "utf8");
let siteCss = extractTag(indexHtml, "style");
let siteJs = extractTag(indexHtml, "script");

const pageCssSpecs = [
  {
    file: "concept.html",
    label: "CONCEPT PAGE",
    markers: ["HERO SECTION (FIRST FOLD", ".concept-hero-fold {"],
  },
  {
    file: "whats-on.html",
    label: "WHATS-ON PAGE",
    markers: [
      "02. PREVIOUS EVENTS",
      ".previous-events-section {",
      ".header-breadcrumb {",
      ".event-list-section {",
    ],
  },
  {
    file: "drinks-food.html",
    label: "DRINKS-FOOD PAGE",
    markers: ["PAGE HERO HEADER", ".menu-page-hero {", ".menu-split-layout {"],
  },
  {
    file: "our-space.html",
    label: "OUR-SPACE PAGE",
    markers: [
      "PAGE CONTENT: OUR SPACE",
      ".gallery-page-wrap {",
      ".gallery-header-section {",
    ],
  },
  {
    // index-2 unique list styles if not already in index
    file: "index-2.html",
    label: "INDEX-2 EVENT LIST",
    markers: [".event-list-section {", ".event-poster-preview-wrap {"],
  },
];

for (const spec of pageCssSpecs) {
  const html = fs.readFileSync(path.join("_legacy", spec.file), "utf8");
  const css = extractTag(html, "style");
  // Only append markers not already fully present for list — index lacks event-list
  const need = spec.markers.some((m) => !siteCss.includes(m.replace(" {", "")));
  if (!need && spec.file !== "index-2.html") {
    // still append page unique slices
  }
  const slice = sliceFromMarkers(css, spec.markers);
  if (slice.trim()) {
    // Avoid double-appending huge shared chrome for index-2 — take only event-list related if base already huge
    if (spec.file === "index-2.html") {
      // Extract only event-list + poster blocks via markers
      const listStart = css.indexOf(".event-list-section");
      const posterStart = css.indexOf(".event-poster-preview-wrap");
      const start = Math.min(
        listStart >= 0 ? listStart : Infinity,
        posterStart >= 0 ? posterStart : Infinity
      );
      if (start < Infinity) {
        // take until menu section or next major SECTION comment after a chunk
        let end = css.indexOf("SECTION: THE RESONANCE MENU", start);
        if (end < 0) end = css.indexOf(".menu-editorial-scroll-track", start);
        if (end < 0) end = Math.min(start + 12000, css.length);
        const chunk = css.slice(start, end);
        if (!siteCss.includes(".event-list-section")) {
          siteCss += `\n\n/* ========== ${spec.label} ========== */\n${chunk}`;
          console.log("appended index-2 event-list CSS", chunk.length);
        }
      }
    } else {
      siteCss += `\n\n/* ========== ${spec.label} (from ${spec.file}) ========== */\n${slice}`;
      console.log(`appended CSS from ${spec.file}`, slice.length);
    }
  }
}

// Page JS extras
const pageJsSpecs = [
  {
    file: "concept.html",
    label: "CONCEPT",
    fns: [
      "initHorizontalPillarsScroll",
      "initImageRevealAnimation",
      "initZigZagParallax",
      "initWaveVideoSync",
    ],
  },
  {
    file: "index-2.html",
    label: "INDEX-2 LIST",
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
];

for (const spec of pageJsSpecs) {
  const html = fs.readFileSync(path.join("_legacy", spec.file), "utf8");
  const js = extractTag(html, "script");
  const parts = [];
  if (spec.consts) {
    for (const c of spec.consts) {
      if (!siteJs.includes(`const ${c}`) && !siteJs.includes(`var ${c}`)) {
        const block =
          extractConstArray(js, c) || extractConstObject(js, c);
        if (block) parts.push(block);
      }
    }
  }
  const missing = (spec.fns || []).filter(
    (fn) => !siteJs.includes(`function ${fn}`)
  );
  if (missing.length) parts.push(extractFunctions(js, missing));
  if (parts.length) {
    siteJs += `\n\n/* ========== ${spec.label} ========== */\n${parts.join("\n\n")}`;
    console.log(`appended JS ${spec.label}`);
  }
}

// Ensure GALLERY_DATA helpers vars
if (siteJs.includes("GALLERY_DATA") && !siteJs.includes("let currentFilter")) {
  siteJs += `\nlet currentFilter = 'all';\nlet activeDataset = typeof GALLERY_DATA !== 'undefined' ? [...GALLERY_DATA] : [];\n`;
}

siteJs += `

/* ========== PAGE BOOTSTRAPS (element-gated) ========== */
document.addEventListener('DOMContentLoaded', function namiPageBootstraps() {
  try { if (typeof initHorizontalPillarsScroll === 'function' && document.getElementById('pillarsPinnedContainer')) initHorizontalPillarsScroll(); } catch (e) {}
  try { if (typeof initImageRevealAnimation === 'function' && document.querySelector('.reveal-on-scroll, .feature-edge-row')) initImageRevealAnimation(); } catch (e) {}
  try { if (typeof initZigZagParallax === 'function' && document.querySelector('.feature-edge-row')) initZigZagParallax(); } catch (e) {}
  try { if (typeof initWaveVideoSync === 'function' && document.querySelector('.wave-video-strap video')) initWaveVideoSync(); } catch (e) {}
  try { if (typeof initMenuScrollSpy === 'function' && document.getElementById('menuPanels')) initMenuScrollSpy(); } catch (e) {}
  try { if (typeof filterGallery === 'function' && document.getElementById('galleryStripsContainer')) filterGallery('all'); } catch (e) {}
  try { if (typeof initEventListHover === 'function' && document.querySelector('.event-list-row')) initEventListHover(); } catch (e) {}
  try { if (typeof initMediaSlider === 'function' && document.getElementById('mediaSliderContainer')) initMediaSlider(); } catch (e) {}
});
`;

const sg = fs.readFileSync("_legacy/styleguide.html", "utf8");
const sgCss = extractTag(sg, "style");

fs.mkdirSync("public/assets/css", { recursive: true });
fs.mkdirSync("public/assets/js", { recursive: true });
fs.writeFileSync("public/assets/css/custom.css", rewrite(siteCss));
fs.writeFileSync("public/assets/js/custom.js", rewrite(siteJs));
fs.writeFileSync("public/assets/css/styleguide.css", rewrite(sgCss));
console.log(
  "Wrote custom.css",
  siteCss.length,
  "custom.js",
  siteJs.length,
  "has calendar",
  siteCss.includes("event-calendar-section"),
  "has splash",
  siteCss.includes("splash-screen"),
  "has EVENTS_DATA",
  siteJs.includes("EVENTS_DATA"),
  "has openEventPopup",
  siteJs.includes("openEventPopup"),
  "has dismissSplash",
  siteJs.includes("dismissSplashScreen")
);
