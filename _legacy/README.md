# Legacy HTML (design source)

Drop updated static HTML + assets here from the design handoff.

Current source mirrored from `Documents/projectdata/nami/Nami`:

- `index.html` — homepage
- `styleguide.html` — style guide
- `assets/` — media referenced by those files

## Port into Next.js

```bash
node _convert/port-legacy-home.js
```

That regenerates `styles/home.css`, `content/home.ts`, `components/home/sections/*`, and `useHomeInteractions.ts`.

Or edit section files by hand (see `DEVELOPERS.md`).
