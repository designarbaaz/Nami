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
| `Hero.tsx` | First fold |
| `Philosophy.tsx` | Story + scatter + wave |
| `Programming.tsx` | What’s On calendar |
| `MenuSection.tsx` | Food / cocktails / dessert |
| `Space.tsx` | Gallery |
| `AudioWidget.tsx` | Now playing |

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
