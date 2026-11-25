import fs from "node:fs";

const legacy = fs.readFileSync("_legacy/our-space.html", "utf8");
const map = JSON.parse(fs.readFileSync("scripts/asset-map.json", "utf8"));

function rewrite(text) {
  let out = text.replace(/(?:\.\/)?assets\//g, "/assets/");
  const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of entries) {
    if (from === to) continue;
    out = out.split(from).join(to);
  }
  return out;
}

const start = legacy.indexOf("const GALLERY_DATA = [");
const i = legacy.indexOf("];", start);
const galleryBlock = legacy.slice(start, i + 2);

const fnStart = legacy.indexOf("function filterGallery(category)");
let j = legacy.indexOf("{", fnStart) + 1;
let depth = 1;
while (j < legacy.length && depth > 0) {
  const ch = legacy[j++];
  if (ch === "{") depth++;
  else if (ch === "}") depth--;
}
const filterFn = legacy.slice(fnStart, j);

let js = fs.readFileSync("public/assets/js/custom.js", "utf8");

// Remove prior broken OUR-SPACE PAGE append (wrong names)
js = js.replace(
  /\/\* ========== OUR-SPACE PAGE[\s\S]*?(?=\/\* ========== PAGE BOOTSTRAPS)/,
  ""
);

if (!js.includes("const GALLERY_DATA")) {
  const boot = js.indexOf("/* ========== PAGE BOOTSTRAPS");
  const inject =
    "\n\n/* ========== OUR-SPACE GALLERY ========== */\n" +
    rewrite(galleryBlock) +
    "\n\nlet currentFilter = 'all';\nlet activeDataset = typeof GALLERY_DATA !== 'undefined' ? [...GALLERY_DATA] : [];\n\n" +
    rewrite(filterFn) +
    "\n\n";
  if (boot > 0) js = js.slice(0, boot) + inject + js.slice(boot);
  else js += inject;
}

js = js.replace(
  /if \(typeof filterGallery === 'function' && document.getElementById\('galleryStripsContainer'\)\) \{[\s\S]*?\} catch \(e\) \{\}/,
  `if (typeof filterGallery === 'function' && document.getElementById('galleryStripsContainer')) {
      filterGallery('all');
    } catch (e) {}`
);

// Fix botched try/catch from replace — rewrite whole bootstrap block cleanly
const bootStart = js.indexOf("/* ========== PAGE BOOTSTRAPS");
if (bootStart >= 0) {
  js =
    js.slice(0, bootStart) +
    `/* ========== PAGE BOOTSTRAPS (element-gated) ========== */
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
}

fs.writeFileSync("public/assets/js/custom.js", js);
console.log("custom.js", js.length);
console.log("GALLERY_DATA", js.includes("const GALLERY_DATA"));
console.log("filterGallery", js.includes("function filterGallery"));
console.log("sample", (js.match(/src: '\/assets\/[^']+'/) || [])[0]);
