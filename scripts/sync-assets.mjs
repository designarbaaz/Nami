/** Convert JPG/PNG → AVIF; copy svg/gif/mp4/webp/avif/js as-is */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const legacyAssets = path.resolve("_legacy/assets");
const publicAssets = path.resolve("public/assets");
fs.mkdirSync(publicAssets, { recursive: true });

const CONVERT = new Set([".jpg", ".jpeg", ".png"]);
const assetMap = {};

/** Runtime-unused legacy files — keep in _legacy, do not publish */
const SKIP_PUBLISH = new Set([
  "Noise-texture.png",
  "loader-1-alpha.mp4",
  "Short-video-2-min.mp4",
  "hero-echo-ref.jpg",
  "hero-target-ref.jpg",
  "Color.png",
  "fluid.svg",
  "Knob.svg",
  "Vinyl-1.svg",
  "Arrow-up.svg",
  "down-arrow-flat.svg",
  "nami-horn-speaker-1.jpg",
  "gallery-1.jpg",
  "gallery-2.jpg",
  "gallery-3.jpg",
  "gallery-4.jpg",
  "gallery-5.jpg",
  "gallery-6.jpg",
  "Menu-food.webp",
  "Menu-desserts.webp",
]);

const files = fs.readdirSync(legacyAssets).filter((f) =>
  fs.statSync(path.join(legacyAssets, f)).isFile()
);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const src = path.join(legacyAssets, file);
  const base = path.basename(file, ext);

  if (/^Noise-texture\.png$/i.test(file) || SKIP_PUBLISH.has(file)) {
    if (/^Noise-texture\.png$/i.test(file)) assetMap[file] = "noise-tile.png";
    console.log("skip publish:", file);
    continue;
  }

  if (CONVERT.has(ext)) {
    const outName = `${base}.avif`;
    const out = path.join(publicAssets, outName);
    assetMap[file] = outName;
    try {
      const meta = await sharp(src).metadata();
      let pipeline = sharp(src).rotate();
      if ((meta.width || 0) > 2400)
        pipeline = pipeline.resize({ width: 2400, withoutEnlargement: true });
      await pipeline.avif({ quality: 65, effort: 4 }).toFile(out);
      const inKb = (fs.statSync(src).size / 1024).toFixed(0);
      const outKb = (fs.statSync(out).size / 1024).toFixed(0);
      console.log(`AVIF ${file} → ${outName} (${inKb}→${outKb}KB)`);
    } catch (e) {
      console.error("AVIF fail", file, e.message);
      fs.copyFileSync(src, path.join(publicAssets, file));
      assetMap[file] = file;
    }
  } else {
    fs.copyFileSync(src, path.join(publicAssets, file));
    assetMap[file] = file;
    console.log("copy:", file);
  }
}

fs.writeFileSync(
  path.resolve("scripts/asset-map.json"),
  JSON.stringify(assetMap, null, 2)
);
console.log("asset-map entries", Object.keys(assetMap).length);
