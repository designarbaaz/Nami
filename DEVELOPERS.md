# NAMI — developer guide

## Customize look & behaviour (start here)

| Goal | File |
|------|------|
| Homepage / site styles | **`public/assets/css/custom.css`** |
| Homepage / site interactions | **`public/assets/js/custom.js`** |
| Styleguide styles | **`public/assets/css/styleguide.css`** |
| Calendar event copy | **`content/home.ts`** |
| URL, email, social, port | **`.env`** |
| Homepage section order | **`components/home/HomePage.tsx`** |

Edit CSS/JS directly under `public/assets/` — hard-refresh the browser after changes.

---

## Folder map

```
public/assets/
  css/custom.css          ← site styles (single file)
  css/styleguide.css      ← styleguide styles
  js/custom.js            ← site interactions (single file)
  …images / video…

components/
  common/                 ← shared (Header, Footer, Overlays, Modals, …)
  home/HomePage.tsx       ← homepage section order
  home/sections/          ← homepage-only blocks
  layout/SiteShell.tsx    ← global chrome (header/footer/css/js)

app/
  (site)/layout.tsx       ← wraps all site pages with SiteShell
  (site)/page.tsx         ← route /
  (site)/…                ← add more site pages here
  styleguide/page.tsx     ← outside SiteShell (own layout)
```

---

## Header & Footer (global)

Already global for every page under `app/(site)/` via `SiteShell`.

- Edit markup: `components/common/Header.tsx` / `Footer.tsx`
- Edit styles: `public/assets/css/custom.css`
- Do **not** re-import Header/Footer inside individual pages

Styleguide (`/styleguide`) does **not** use SiteShell, so it keeps its own chrome.

---

## Create a new page

1. Add a folder under `app/(site)/`:

```
app/(site)/about/page.tsx
```

2. Example page:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="page-wrap">
      <section id="about" className="section-block">
        <h1 className="section-heading">About NAMI</h1>
        <p className="section-body">Your copy here.</p>
      </section>
    </main>
  );
}
```

3. Open **http://nami.localhost/about** — Header/Footer/CSS/JS are already applied.

4. Optional: import a common section:

```tsx
import Philosophy from "@/components/home/sections/Philosophy";
// or a shared one from @/components/common/...
```

---

## Create a new section (page-specific)

1. Add `components/home/sections/MySection.tsx` (or copy `components/common/SectionTemplate.tsx`)
2. Import it in `components/home/HomePage.tsx` (or your new page)
3. Add CSS rules to `public/assets/css/custom.css`
4. Add JS (if needed) to `public/assets/js/custom.js`

---

## Create a common section (reuse on any page)

1. Add `components/common/MySection.tsx`
2. Export it from `components/common/index.ts` (optional but handy)
3. Import anywhere:

```tsx
import { MySection } from "@/components/common";
// or
import MySection from "@/components/common/MySection";
```

4. Styles still go in `public/assets/css/custom.css` so one CSS file stays the source of truth.

**Already common:** `Header`, `Footer`, `Overlays`, `Modals` (reserve + full menu).

---

## Homepage-only sections

| File | Block |
|------|--------|
| `Hero.tsx` | First fold (Loader-banner video) |
| `Philosophy.tsx` | Story + scatter + wave strap |
| `Programming.tsx` | What’s On event list |
| `MenuSection.tsx` | Food / cocktails / dessert |
| `Space.tsx` | Spin gallery preview |
| `Press.tsx` | Media mentions slider |
| `InstagramStrap.tsx` | Instagram grid |
| `AudioWidget.tsx` | Now playing |

## Multi-page routes (`app/(site)/`)

Matches live static: https://nami.reputationindia.in/

| Route | Legacy HTML | Notes |
|-------|-------------|--------|
| `/` | `index.html` | Canonical home — calendar, splash, vinyl-loop hero |
| `/index-2` | `index-2.html` | Alternate home — event list, Loader-banner hero |
| `/concept` | `concept.html` | |
| `/whats-on` | `whats-on.html` | |
| `/drinks-food` | `drinks-food.html` | |
| `/our-space` | `our-space.html` | |

**Fonts:** Google **Chivo** for `--font-heading` / `--font-body` (same as live). Typekit Savate remains loaded for styleguide docs only.

---

## Incoming HTML from design

1. Save in `_legacy/`
2. Port markup into `components/common/` or `components/home/sections/`
3. Put CSS into `public/assets/css/custom.css`
4. Put behaviour into `public/assets/js/custom.js`

---

## Local URL

1. `npm run dev`
2. **http://nami.localhost**

---

## Live deploy checklist (SEO + speed + stability)

Build from the start so live stays healthy. Strapi comes later — content already goes through `lib/cms.ts`.

### Before upload

| Rule | Why |
|------|-----|
| Do **not** upload `_legacy/` | Design reference only (~35MB) |
| Set `NEXT_PUBLIC_SITE_URL=https://…` | SEO canonical, OG, sitemap, HSTS |
| Staging: `NEXT_PUBLIC_SITE_INDEXING=false` | Keeps unfinished site out of Google |
| Production: leave indexing unset/`true` | Allows crawl + sitemap |

### Start commands (small VPS)

```bash
npm run build:live
npm run start:live
```

(`build` / `start` also work on machines with enough RAM.)

### Speed / no-flash foundations

- Instant dark `html/body` in `globals.css` + inline critical CSS (no white FOUC)
- Homepage noise uses small `noise-tile.png` (not 14MB texture)
- Wave video loads only near viewport (`preload="none"` + `data-src`)
- Hero video: `preload="auto"`, **no poster** (poster caused splash on reload)
- Below-fold images use `loading="lazy"`
- Site + styleguide CSS linked from layout `<head>` (not late in body)
- Middleware skips `/assets` (Node not involved for every media hit)
- CSS/JS cache is short + revalidate; images/video cache long

### SEO foundations already in place

- Metadata + Open Graph + Twitter cards
- JSON-LD (Restaurant / Bar)
- `sitemap.xml` + `robots.txt`
- Canonical URLs from `.env`

### Strapi later (not now)

1. Set `NEXT_PUBLIC_STRAPI_URL` in `.env`
2. Implement fetch inside `lib/cms.ts` only
3. Keep pages/sections calling `getEvents()` / cms helpers — no markup rewrite
