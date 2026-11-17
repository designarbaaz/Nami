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
| Fix click / scroll behaviour | `components/home/useHomeInteractions.ts` |
| URL, email, social, port | `.env` only |
| Incoming HTML from design | Save in `_legacy/`, then copy the relevant `<section>` into the matching `sections/*.tsx` |

## Section files

| File | Page block |
|------|------------|
| `Header.tsx` | Top nav + drawer |
| `Hero.tsx` | First fold |
| `Philosophy.tsx` | Story + wave strap |
| `Programming.tsx` | Calendar |
| `MenuSection.tsx` | Resonance menu |
| `Space.tsx` | Gallery / space |
| `Faqs.tsx` | FAQs |
| `Reserve.tsx` | Booking form |
| `Footer.tsx` | Footer |
| `AudioWidget.tsx` | Now playing |
| `Overlays.tsx` | Noise / warmth layers |

## Performance notes

- Noise overlay uses `public/assets/noise-tile.png` (~40KB), not the 14MB original.
- Wave strap videos use `preload="none"` and load when near the viewport.
- Hero video uses `preload="metadata"` + poster.
- Keep heavy media out of the first fold when porting new HTML.

## Local URL

1. `npm run dev` (port from `.env` `PORT`)
2. Nginx → **http://nami.localhost**
