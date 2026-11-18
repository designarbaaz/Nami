# NAMI — developer guide (keep it simple)

Site is **under development**. New HTML may land in `_legacy/` — port into the matching section file below.

## Folder map

```
app/page.tsx                 → route only
components/home/
  HomePage.tsx               → section order (edit here to reorder)
  useHomeInteractions.ts     → clicks, scroll, audio, calendar JS
  sections/                  → one file per page block
content/home.ts              → events + editable data
styles/home.css              → homepage styles
lib/site.ts + lib/env.ts     → brand + .env-driven config
public/assets/               → images / video
_legacy/                     → drop incoming HTML here (reference only)
```

## How to change things

| Goal | Where |
|------|--------|
| Reorder / hide a block | `components/home/HomePage.tsx` |
| Edit calendar event copy | `content/home.ts` → `EVENTS_DATA` |
| Change hero / menu markup | `components/home/sections/Hero.tsx` (etc.) |
| Fix click / scroll behaviour | `useHomeInteractions.ts` |
| URL, email, social, port | `.env` only |
| Incoming HTML from design | Save in `_legacy/`, then run `node _convert/port-legacy-home.js` (or port section by section) |

## Section files

| File | Page block |
|------|------------|
| `Header.tsx` | Top nav + drawer |
| `Hero.tsx` | First fold |
| `Philosophy.tsx` | Story + scatter cards + wave strap |
| `Programming.tsx` | Calendar / What's On |
| `MenuSection.tsx` | Editorial food/cocktails/dessert scroll |
| `Space.tsx` | Gallery / space |
| `Modals.tsx` | Floating reserve CTA + reservation + full menu |
| `Footer.tsx` | Footer |
| `AudioWidget.tsx` | Now playing |
| `Overlays.tsx` | Noise / warmth / toast |

## Performance notes

- Wave strap videos use `preload="none"` + `data-src` and load when near the viewport.
- Hero video uses poster when present.
- Keep heavy media out of the first fold when porting new HTML.
- Prefer `Noise-texture.png` only if needed; large textures hurt LCP.

## Local URL

1. `npm run dev` (port from `.env` `PORT`)
2. Nginx → **http://nami.localhost**
