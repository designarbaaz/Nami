/**
 * Convert _snippets HTML → TSX components with Next-friendly attrs & routes.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const snip = path.join(root, "scripts", "_snippets");

const ROUTE_MAP = [
  ["concept.html", "/concept"],
  ["whats-on.html", "/whats-on"],
  ["drinks-food.html", "/drinks-food"],
  ["our-space.html", "/our-space"],
  ["index-2.html", "/"],
  ["index.html", "/"],
  ["styleguide.html", "/styleguide"],
];

function htmlToJsx(html) {
  let s = html;

  // Route rewrites
  for (const [from, to] of ROUTE_MAP) {
    s = s.split(`href="${from}"`).join(`href="${to}"`);
    s = s.split(`href='${from}'`).join(`href='${to}'`);
  }
  // Hash-only home anchors from subpages → /#...
  s = s.replace(/href="#hero"/g, 'href="/#hero"');
  s = s.replace(/href="#press"/g, 'href="/#press"');
  s = s.replace(/href="#programming"/g, 'href="/#programming"');
  s = s.replace(/href="#philosophy"/g, 'href="/#philosophy"');
  s = s.replace(/href="#menu"/g, 'href="/#menu"');
  s = s.replace(/href="#space"/g, 'href="/#space"');
  s = s.replace(/href="#reservation"/g, 'href="/#reservation"');

  // Strip onerror handlers
  s = s.replace(/\s+onerror="[^"]*"/gi, "");

  // Comments stay

  // class → className, for → htmlFor
  s = s.replace(/\sclass=/g, " className=");
  s = s.replace(/\sfor=/g, " htmlFor=");

  // boolean attrs
  s = s.replace(
    /\s(autoplay|muted|loop|playsinline|webkit-playsinline|disablepictureinpicture|controls|checked|selected|disabled|readonly|required|multiple|novalidate|autofocus)(?=[\s>])/gi,
    (_, a) => {
      const map = {
        autoplay: "autoPlay",
        muted: "muted",
        loop: "loop",
        playsinline: "playsInline",
        "webkit-playsinline": "playsInline",
        disablepictureinpicture: "disablePictureInPicture",
        controls: "controls",
        checked: "defaultChecked",
        selected: "defaultSelected",
        disabled: "disabled",
        readonly: "readOnly",
        required: "required",
        multiple: "multiple",
        novalidate: "noValidate",
        autofocus: "autoFocus",
      };
      const key = a.toLowerCase();
      return ` ${map[key] || a}`;
    }
  );

  // x-webkit-airplay="deny" → drop (non-react)
  s = s.replace(/\s+x-webkit-airplay="[^"]*"/gi, "");

  // stroke-width etc kebab → camel for SVG
  const svgAttrs = [
    "stroke-width",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-dasharray",
    "stroke-dashoffset",
    "fill-rule",
    "clip-rule",
    "clip-path",
    "font-family",
    "font-size",
    "font-weight",
    "letter-spacing",
    "text-anchor",
    "stop-color",
    "stop-opacity",
    "flood-color",
    "flood-opacity",
    "color-interpolation-filters",
    "tabindex",
    "colspan",
    "rowspan",
    "charset",
    "crossorigin",
    "datetime",
    "formaction",
    "formenctype",
    "formmethod",
    "formnovalidate",
    "formtarget",
    "hreflang",
    "inputmode",
    "maxlength",
    "minlength",
    "radiogroup",
    "spellcheck",
  ];
  for (const a of svgAttrs) {
    const camel = a.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    s = s.replace(new RegExp(`\\s${a}=`, "gi"), ` ${camel}=`);
  }

  // onclick="..." → onClick={(e) => { ... }}
  s = s.replace(/\sonclick="([^"]*)"/gi, (_, code) => {
    let body = code
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    // Prefix bare function calls with window
    body = body.replace(
      /\b(toggleMenuDrawer|openReservationModal|closeReservationModal|openEventPopup|openFullMenuModal|filterGallery|showToast)\s*\(/g,
      "(window as any).$1?.("
    );
    return ` onClick={(e) => { const event = e; ${body} }}`;
  });

  // inline style="a: b; c: d" → style={{ a: 'b', c: 'd' }}
  s = s.replace(/\sstyle="([^"]*)"/gi, (_, css) => {
    const decls = css
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => {
        const i = d.indexOf(":");
        if (i < 0) return null;
        let prop = d.slice(0, i).trim();
        let val = d.slice(i + 1).trim();
        prop = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        if (prop === "float") prop = "cssFloat";
        // numeric px?
        if (/^-?\d+(\.\d+)?px$/.test(val)) {
          return `${prop}: ${parseFloat(val)}`;
        }
        if (/^-?\d+(\.\d+)?$/.test(val) && prop !== "zIndex" && prop !== "fontWeight" && prop !== "opacity" && prop !== "flex") {
          // keep as number for unitless
        }
        if (/^(zIndex|fontWeight|opacity|flex|order|grow|shrink)$/.test(prop) && /^-?\d+(\.\d+)?$/.test(val)) {
          return `${prop}: ${val}`;
        }
        val = val.replace(/'/g, "\\'");
        return `${prop}: '${val}'`;
      })
      .filter(Boolean);
    return ` style={{ ${decls.join(", ")} }}`;
  });

  // Self-close void elements that aren't already
  s = s.replace(/<(img|source|br|hr|input|meta|link|area|base|col|embed|param|track|wbr)(\s[^>]*?)?(?<!\/)\>/gi, (m, tag, attrs = "") => {
    if (/\/>\s*$/.test(m)) return m;
    return `<${tag}${attrs} />`;
  });

  // Fix double spaces in self close
  s = s.replace(/\s+\/>/g, " />");

  // amp entities in text already fine in JSX; keep &amp; as &amp; or convert?
  // JSX prefers {' '} etc. Leave entities.

  return s;
}

function wrapComponent(name, body, opts = {}) {
  const client = opts.client !== false;
  const imports = opts.imports || [];
  return `${client ? '// @ts-nocheck\n"use client";\n\n' : "// @ts-nocheck\n\n"}${imports.join("\n")}${imports.length ? "\n\n" : ""}export default function ${name}() {
  return (
    <>
${body
  .split("\n")
  .map((l) => "      " + l)
  .join("\n")}
    </>
  );
}
`;
}

function write(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  console.log("wrote", rel, content.length);
}

// --- Home sections (canonical index.html) ---
const homeSections = {
  Hero: "index-hero.html",
  Philosophy: "index-philosophy.html",
  Programming: "index-programming.html",
  MenuSection: "index-menu.html",
  Space: "index-space.html",
  Press: "index-press.html",
  InstagramStrap: "index-instagram.html",
};

// Alternate home (index-2.html event-list variant)
const index2Sections = {
  Hero: "hero.html",
  Philosophy: "philosophy.html",
  Programming: "programming.html",
  MenuSection: "menu.html",
  Space: "space.html",
  Press: "press.html",
  InstagramStrap: "instagram.html",
};

for (const [comp, file] of Object.entries(homeSections)) {
  let html = fs.readFileSync(path.join(snip, file), "utf8");
  // Append wave strap after philosophy
  if (comp === "Philosophy" && fs.existsSync(path.join(snip, "index-wave.html"))) {
    html += "\n" + fs.readFileSync(path.join(snip, "index-wave.html"), "utf8");
  }
  let jsx = htmlToJsx(html.trim());
  // SVG <style> → JSX style tag with template string
  jsx = jsx.replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => {
    return `<style>{\`${css.replace(/`/g, "\\`")}\`}</style>`;
  });
  write(`components/home/sections/${comp}.tsx`, wrapComponent(comp, jsx));
}

// index-2: generate list-style Programming (+ hero variant) as dedicated sections
{
  const progFile = path.join(snip, "programming.html");
  if (fs.existsSync(progFile)) {
    let jsx = htmlToJsx(fs.readFileSync(progFile, "utf8").trim());
    if (!jsx.includes("eventPosterPreview")) {
      jsx += `
      <div className="event-poster-preview-wrap" id="eventPosterPreview" aria-hidden="true">
        <img className="event-poster-img" id="eventPosterImg" src="" alt="" />
      </div>`;
    }
    write(
      "components/index-2/sections/EventListProgramming.tsx",
      wrapComponent("EventListProgramming", jsx)
    );
  }
  const hero2 = path.join(snip, "hero.html");
  if (fs.existsSync(hero2)) {
    let jsx = htmlToJsx(fs.readFileSync(hero2, "utf8").trim());
    write("components/index-2/sections/Index2Hero.tsx", wrapComponent("Index2Hero", jsx));
  }
}

// Footer from index.html chrome
{
  const footerFile = fs.existsSync(path.join(snip, "index-footer.html"))
    ? "index-footer.html"
    : "footer.html";
  const html = fs.readFileSync(path.join(snip, footerFile), "utf8");
  let jsx = htmlToJsx(html.trim());
  jsx = jsx.replace(
    /href="https:\/\/chat\.whatsapp\.com\/"/g,
    "href={siteConfig.social.whatsapp}"
  );
  jsx = jsx.replace(
    /href="https:\/\/www\.instagram\.com\/namibombay\/"/g,
    "href={siteConfig.social.instagram}"
  );
  jsx = jsx.replace(
    /href="mailto:experience@nami\.in"/g,
    "href={`mailto:${siteConfig.email}`}"
  );
  jsx = jsx.replace(/>experience@nami\.in</g, ">{siteConfig.email}<");
  write(
    "components/common/Footer.tsx",
    wrapComponent("Footer", jsx, {
      imports: ['import { siteConfig } from "@/lib/site";'],
    })
  );
}

// Keep hand-tuned Header.tsx (pathname-aware) — do not overwrite.

// Page mains
const pages = [
  ["concept", "ConceptPage", "concept.main.html"],
  ["whats-on", "WhatsOnPage", "whats-on.main.html"],
  ["drinks-food", "DrinksFoodPage", "drinks-food.main.html"],
  ["our-space", "OurSpacePage", "our-space.main.html"],
];

for (const [dir, name, file] of pages) {
  const html = fs.readFileSync(path.join(snip, file), "utf8");
  let jsx = htmlToJsx(html.trim());
  write(
    `components/${dir}/${name}.tsx`,
    wrapComponent(name, jsx)
  );
}

console.log("done");
