/**
 * Sync assets + extract CSS/JS from _legacy HTML into public/.
 * - JPG/PNG → AVIF (skip svg/gif/webp/avif/mp4)
 * - Copy svg/gif/mp4/webp/avif as-is
 * - Rebuild custom.css / custom.js / styleguide.css from HTML embeds
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const legacy = path.join(root, "_legacy");
const publicAssets = path.join(root, "public", "assets");
const legacyAssets = path.join(legacy, "assets");

const CONVERT_EXT = new Set([".jpg", ".jpeg", ".png"]);

/** Map original basename → public basename after conversion */
const assetMap = new Map();

function rewriteAssetRefs(text) {
  let out = text;
  out = out.replace(/(?:\.\/)?assets\//g, "/assets/");
  const entries = [...assetMap.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of entries) {
    if (from === to) continue;
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    out = out.replace(re, to);
  }
  out = out.replace(/\/assets\/Noise-texture\.(?:png|avif)/gi, "/assets/noise-tile.png");
  return out;
}

function extractTag(html, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const parts = [];
  let m;
  while ((m = re.exec(html))) {
    const openEnd = m[0].indexOf(">");
    const open = m[0].slice(0, openEnd + 1);
    if (tag === "script" && /\ssrc\s*=/.test(open)) continue;
    parts.push(m[1]);
  }
  return parts.join("\n\n");
}

/** Slice CSS from the first line that contains any of the markers. */
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
  // Stop before footer/shared chrome re-declarations if marked; else take to end
  const stopMarkers = [
    "/* =========================================================\n       FOOTER",
    "SITE FOOTER",
    "AUDIO WIDGET",
    "NOW PLAYING",
  ];
  let end = lines.length;
  for (let i = start + 5; i < lines.length; i++) {
    // Don't stop too aggressively — page CSS often ends with media queries
  }
  return lines.slice(start, end).join("\n");
}

/**
 * Extract named function bodies from JS source.
 */
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

/** Extract const/let/var GALLERY_ITEMS = [...] */
function extractConstArray(js, name) {
  const re = new RegExp(
    `(?:const|let|var)\\s+${name}\\s*=\\s*\\[`,
    "m"
  );
  const m = re.exec(js);
  if (!m) return "";
  let i = m.index + m[0].length;
  let depth = 1;
  while (i < js.length && depth > 0) {
    const ch = js[i++];
    if (ch === "[") depth++;
    else if (ch === "]") depth--;
  }
  // include trailing semicolon
  while (i < js.length && /[\s;]/.test(js[i])) i++;
  return js.slice(m.index, i);
}

async function convertOrCopyAssets() {
  fs.mkdirSync(publicAssets, { recursive: true });
  const files = fs
    .readdirSync(legacyAssets)
    .filter((f) => fs.statSync(path.join(legacyAssets, f)).isFile());

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const srcPath = path.join(legacyAssets, file);
    const base = path.basename(file, ext);

    if (/^Noise-texture\.png$/i.test(file)) {
      assetMap.set(file, "noise-tile.png");
      console.log("skip (use noise-tile):", file);
      continue;
    }

    if (CONVERT_EXT.has(ext)) {
      const outName = `${base}.avif`;
      const outPath = path.join(publicAssets, outName);
      assetMap.set(file, outName);
      try {
        const meta = await sharp(srcPath).metadata();
        const w = meta.width || 2000;
        let pipeline = sharp(srcPath).rotate();
        if (w > 2400) pipeline = pipeline.resize({ width: 2400, withoutEnlargement: true });
        await pipeline.avif({ quality: 65, effort: 4 }).toFile(outPath);
        const inSize = fs.statSync(srcPath).size;
        const outSize = fs.statSync(outPath).size;
        console.log(
          `AVIF ${file} → ${outName} (${(inSize / 1024).toFixed(0)}KB → ${(outSize / 1024).toFixed(0)}KB)`
        );
      } catch (err) {
        console.error("AVIF fail", file, err.message);
        fs.copyFileSync(srcPath, path.join(publicAssets, file));
        assetMap.set(file, file);
      }
    } else {
      fs.copyFileSync(srcPath, path.join(publicAssets, file));
      assetMap.set(file, file);
      console.log("copy:", file);
    }
  }
}

function extractCssJs() {
  const cssOut = path.join(publicAssets, "css");
  const jsOut = path.join(publicAssets, "js");
  fs.mkdirSync(cssOut, { recursive: true });
  fs.mkdirSync(jsOut, { recursive: true });

  const index2 = fs.readFileSync(path.join(legacy, "index-2.html"), "utf8");
  let siteCss = extractTag(index2, "style");
  let siteJs = extractTag(index2, "script");

  const pageCssSpecs = [
    {
      file: "concept.html",
      label: "CONCEPT PAGE",
      markers: ["HERO SECTION (FIRST FOLD", ".concept-hero-fold {"],
    },
    {
      file: "whats-on.html",
      label: "WHATS-ON PAGE",
      markers: ["02. PREVIOUS EVENTS", ".previous-events-section {", ".header-breadcrumb {"],
    },
    {
      file: "drinks-food.html",
      label: "DRINKS-FOOD PAGE",
      markers: ["PAGE HERO HEADER", ".menu-page-hero {", ".menu-split-layout {"],
    },
    {
      file: "our-space.html",
      label: "OUR-SPACE PAGE",
      markers: ["PAGE CONTENT: OUR SPACE", ".gallery-page-wrap {", ".gallery-header-section {"],
    },
  ];

  for (const spec of pageCssSpecs) {
    const html = fs.readFileSync(path.join(legacy, spec.file), "utf8");
    const css = extractTag(html, "style");
    const slice = sliceFromMarkers(css, spec.markers);
    if (slice.trim()) {
      siteCss += `\n\n/* ========== ${spec.label} (from ${spec.file}) ========== */\n${slice}`;
      console.log(`appended page CSS from ${spec.file} (${slice.length} chars)`);
    } else {
      console.warn(`no CSS slice for ${spec.file}`);
    }
  }

  // Page-unique JS functions + data
  const pageJsSpecs = [
    {
      file: "concept.html",
      label: "CONCEPT PAGE",
      fns: [
        "initHorizontalPillarsScroll",
        "initImageRevealAnimation",
        "initZigZagParallax",
        "initWaveVideoSync",
      ],
    },
    {
      file: "whats-on.html",
      label: "WHATS-ON PAGE",
      fns: ["initEventListHover"],
    },
    {
      file: "drinks-food.html",
      label: "DRINKS-FOOD PAGE",
      fns: ["initMenuScrollSpy", "setActiveCategory", "syncCategoryFromScroll"],
    },
    {
      file: "our-space.html",
      label: "OUR-SPACE PAGE",
      fns: ["filterGallery", "buildGalleryStrips", "initGalleryFilters"],
      consts: ["GALLERY_ITEMS"],
    },
  ];

  for (const spec of pageJsSpecs) {
    const html = fs.readFileSync(path.join(legacy, spec.file), "utf8");
    const js = extractTag(html, "script");
    const missingFns = (spec.fns || []).filter(
      (fn) => !siteJs.includes(`function ${fn}`)
    );
    const parts = [];
    if (spec.consts) {
      for (const c of spec.consts) {
        if (!siteJs.includes(c)) {
          const block = extractConstArray(js, c);
          if (block) parts.push(block);
        }
      }
    }
    if (missingFns.length) {
      parts.push(extractFunctions(js, missingFns));
    }
    // Also pull DOMContentLoaded page bootstraps that call these — inject safe auto-init
    if (parts.length) {
      siteJs += `\n\n/* ========== ${spec.label} (from ${spec.file}) ========== */\n${parts.join("\n\n")}`;
      console.log(
        `appended JS from ${spec.file}: ${[...(spec.consts || []), ...missingFns].join(", ")}`
      );
    } else {
      console.log(`skip JS ${spec.file} (already present)`);
    }
  }

  // Safe bootstraps for page-specific inits (idempotent / element-gated)
  siteJs += `

/* ========== PAGE BOOTSTRAPS (element-gated) ========== */
document.addEventListener('DOMContentLoaded', function namiPageBootstraps() {
  try { if (typeof initHorizontalPillarsScroll === 'function' && document.getElementById('pillarsPinnedContainer')) initHorizontalPillarsScroll(); } catch (e) {}
  try { if (typeof initImageRevealAnimation === 'function' && document.querySelector('.reveal-on-scroll, .feature-edge-row')) initImageRevealAnimation(); } catch (e) {}
  try { if (typeof initZigZagParallax === 'function' && document.querySelector('.feature-edge-row')) initZigZagParallax(); } catch (e) {}
  try { if (typeof initWaveVideoSync === 'function' && document.querySelector('.wave-video-strap video')) initWaveVideoSync(); } catch (e) {}
  try { if (typeof initMenuScrollSpy === 'function' && document.getElementById('menuPanels')) initMenuScrollSpy(); } catch (e) {}
  try {
    if (typeof filterGallery === 'function' && document.getElementById('galleryStripsContainer')) {
      if (typeof buildGalleryStrips === 'function') buildGalleryStrips('all');
      else filterGallery('all');
      document.querySelectorAll('.gallery-filter-pill').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var cat = btn.getAttribute('data-filter') || 'all';
          document.querySelectorAll('.gallery-filter-pill').forEach(function(b){ b.classList.remove('active'); });
          btn.classList.add('active');
          filterGallery(cat);
        });
      });
    }
  } catch (e) {}
  try { if (typeof initEventListHover === 'function' && document.querySelector('.event-list-row')) initEventListHover(); } catch (e) {}
  try { if (typeof initMediaSlider === 'function' && document.getElementById('mediaSliderContainer')) initMediaSlider(); } catch (e) {}
});
`;

  const sg = fs.readFileSync(path.join(legacy, "styleguide.html"), "utf8");
  const sgCss = extractTag(sg, "style");

  const finalCss = rewriteAssetRefs(siteCss);
  const finalJs = rewriteAssetRefs(siteJs);
  const finalSg = rewriteAssetRefs(sgCss);

  fs.writeFileSync(path.join(cssOut, "custom.css"), finalCss);
  fs.writeFileSync(path.join(jsOut, "custom.js"), finalJs);
  fs.writeFileSync(path.join(cssOut, "styleguide.css"), finalSg);

  console.log("Wrote custom.css", finalCss.length, "chars");
  console.log("Wrote custom.js", finalJs.length, "chars");
  console.log("Wrote styleguide.css", finalSg.length, "chars");

  fs.writeFileSync(
    path.join(root, "scripts", "asset-map.json"),
    JSON.stringify(Object.fromEntries(assetMap), null, 2)
  );
}

/** Dump body sections as HTML snippets for React porting */
function dumpBodySnippets() {
  const outDir = path.join(root, "scripts", "_snippets");
  fs.mkdirSync(outDir, { recursive: true });

  const pages = {
    "index-2.html": [
      "header",
      "menuDrawer",
      "hero",
      "philosophy",
      "programming",
      "menu",
      "space",
      "press",
      "instagram",
      "footer",
      "audioWidget",
    ],
  };

  // Also dump full main content of subpages
  for (const file of [
    "concept.html",
    "whats-on.html",
    "drinks-food.html",
    "our-space.html",
    "styleguide.html",
  ]) {
    const html = fs.readFileSync(path.join(legacy, file), "utf8");
    let body = "";
    const main = /<main[\s\S]*?<\/main>/i.exec(html);
    if (main) body = main[0];
    else {
      const b = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(html);
      body = b ? b[1] : html;
    }
    fs.writeFileSync(
      path.join(outDir, file.replace(".html", ".main.html")),
      rewriteAssetRefs(body)
    );
    console.log("snippet:", file);
  }

  const index2 = fs.readFileSync(path.join(legacy, "index-2.html"), "utf8");
  // header
  const header = /<header class="site-header">[\s\S]*?<\/header>/i.exec(index2);
  if (header) fs.writeFileSync(path.join(outDir, "header.html"), rewriteAssetRefs(header[0]));
  const drawer = /<div id="menuDrawer"[\s\S]*?<\/div>\s*(?=<div id="reserve|<section id="hero"|<!-- )/i.exec(index2);
  // broader drawer extract
  const drawer2 = /<div id="menuDrawer"[\s\S]*?id="menuDrawer"[\s\S]{0}|<div id="menuDrawer"[\s\S]*?(?=<div id="reserveFloatingBtn"|<section id="hero")/i.exec(index2);
  if (drawer2) fs.writeFileSync(path.join(outDir, "drawer.html"), rewriteAssetRefs(drawer2[0]));

  const footer = /<footer class="site-footer"[\s\S]*?<\/footer>/i.exec(index2);
  if (footer) fs.writeFileSync(path.join(outDir, "footer.html"), rewriteAssetRefs(footer[0]));

  for (const id of ["hero", "philosophy", "programming", "menu", "space", "press", "instagram"]) {
    const re = new RegExp(
      `<section[^>]*id="${id}"[\\s\\S]*?<\\/section>`,
      "i"
    );
    const m = re.exec(index2);
    if (m) {
      fs.writeFileSync(path.join(outDir, `${id}.html`), rewriteAssetRefs(m[0]));
      console.log("snippet section:", id, m[0].length);
    }
  }
}

async function main() {
  console.log("=== Convert / copy assets ===");
  await convertOrCopyAssets();
  console.log("\n=== Extract CSS / JS ===");
  extractCssJs();
  console.log("\n=== Dump body snippets ===");
  dumpBodySnippets();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
