# NAMI — Next.js Frontend

Hi-Fi listening room & dining experience site. Frontend-only for now; Strapi backend can plug in later.

## Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- Vanilla CSS (existing brand styles)
- SEO: metadata, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`
- Security headers + lightweight middleware

## Project structure

```
app/                 # Routes + SEO (layout, sitemap, robots)
components/          # Home + style guide UI
lib/site.ts          # Site config (URL, SEO copy) — Strapi-ready
public/assets/       # Images, video, SVG
middleware.ts        # Probe blocking + request id
next.config.ts       # Security headers, image/cache config
```

## Local setup (`nami.localhost`)

### 1. Hosts file (one-time, Admin)

```bash
npm run setup:hosts
```

Or add this line manually to `C:\Windows\System32\drivers\etc\hosts`:

```
127.0.0.1   nami.localhost
```

### 2. Install & run

```bash
npm install
npm run dev
```

Open: **http://nami.localhost:3000** (or http://127.0.0.1:3000 before hosts is set)

Style guide: **http://nami.localhost:3000/styleguide**

## Environment

One file only: **`.env`** (gitignored). Create/edit it locally; on staging/production upload or set the same keys in the host panel.

```bash
NEXT_PUBLIC_SITE_URL=http://nami.localhost:3000
```

## Staging

On the server, set `.env` (or host env vars) then:

```bash
NEXT_PUBLIC_SITE_URL=https://your-staging-host.example.com
npm run build
npm start
```

## Scripts

| Command        | Purpose                |
|----------------|------------------------|
| `npm run dev`  | Local on nami.localhost |
| `npm run build`| Production build       |
| `npm start`    | Serve production build |
| `npm run lint` | ESLint                 |

## Strapi later

Add these to the same `.env` when the backend is ready:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
```

No Strapi wiring yet — frontend is self-contained.
