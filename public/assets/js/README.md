# JS

| File | Used by |
|------|---------|
| `custom.js` | All site pages (via SiteShell → SiteScripts) |

Event calendar data still lives in `content/home.ts` and is injected as `window.__NAMI_EVENTS__` before `initNamiSite()` runs.

Edit `custom.js` directly, then hard-refresh the browser.
