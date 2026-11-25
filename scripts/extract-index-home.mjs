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

const html = fs.readFileSync("_legacy/index.html", "utf8");
const outDir = "scripts/_snippets";
fs.mkdirSync(outDir, { recursive: true });

for (const id of [
  "hero",
  "philosophy",
  "programming",
  "menu",
  "space",
  "press",
  "instagram",
]) {
  const re = new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?<\\/section>`, "i");
  const m = re.exec(html);
  if (m) {
    fs.writeFileSync(path.join(outDir, `index-${id}.html`), rewrite(m[0]));
    console.log("wrote index-" + id, m[0].length);
  } else console.warn("missing", id);
}

const waveRe =
  /<div class="wave-video-strap"[\s\S]*?<div class="wave-strap-overlay"><\/div>\s*<\/div>/;
const wave = waveRe.exec(html);
if (wave) {
  fs.writeFileSync(path.join(outDir, "index-wave.html"), rewrite(wave[0]));
  console.log("wave", wave[0].length);
}

const splash = /<div id="splashScreen"[\s\S]*?<\/div>\s*<\/div>/.exec(html);
if (splash) {
  fs.writeFileSync(path.join(outDir, "index-splash.html"), rewrite(splash[0]));
  console.log("splash", splash[0].length);
}

const indexCss = extractTag(html, "style");
const indexJs = extractTag(html, "script");
fs.writeFileSync(path.join(outDir, "index-style.css"), rewrite(indexCss));
fs.writeFileSync(path.join(outDir, "index-script.js"), rewrite(indexJs));
console.log("css", indexCss.length, "js", indexJs.length);

// Also dump header/footer/drawer from index for chrome parity
const header = /<header class="site-header">[\s\S]*?<\/header>/i.exec(html);
if (header) {
  fs.writeFileSync(path.join(outDir, "index-header.html"), rewrite(header[0]));
}
const drawer =
  /<div id="menuDrawer"[\s\S]*?(?=<div id="splashScreen"|<section id="hero")/i.exec(
    html
  );
if (drawer) {
  fs.writeFileSync(path.join(outDir, "index-drawer.html"), rewrite(drawer[0]));
}
const footer = /<footer class="site-footer"[\s\S]*?<\/footer>/i.exec(html);
if (footer) {
  fs.writeFileSync(path.join(outDir, "index-footer.html"), rewrite(footer[0]));
}
