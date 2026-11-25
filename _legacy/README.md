# NAMI — legacy static HTML (design reference)

Synced from the design package / https://nami.reputationindia.in/  
**Do not upload this folder to production.**

| File | Next.js route |
|------|----------------|
| **`index.html`** | **`/`** (canonical home — calendar + splash) |
| `index-2.html` | `/index-2` (alternate list home) |
| `concept.html` | `/concept` |
| `whats-on.html` | `/whats-on` |
| `drinks-food.html` | `/drinks-food` |
| `our-space.html` | `/our-space` |
| `styleguide.html` | `/styleguide` |

Font: **Chivo** (Google Fonts) for heading + body.

After updating HTML here:

```bash
node scripts/rebuild-from-index.mjs
node scripts/html-to-tsx.mjs
node scripts/fix-jsx-comments.mjs
```

Then review `components/` and keep `Header.tsx` pathname-aware (generator skips overwriting it).
