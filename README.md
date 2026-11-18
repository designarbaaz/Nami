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
public/assets/css/custom.css   # Site styles (edit this)
public/assets/js/custom.js     # Site interactions (edit this)
components/common/             # Shared Header, Footer, Modals, …
components/home/               # Homepage sections
app/(site)/                    # Site pages (global header/footer)
content/home.ts                # Editable events data
_legacy/                       # Drop incoming HTML here
```

See **[DEVELOPERS.md](./DEVELOPERS.md)** for new pages, sections, and shared components.

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

Nginx (port 80): **http://nami.localhost**  
Direct Next: http://127.0.0.1:3000

Style guide: **http://nami.localhost/styleguide**

Nginx conf: `C:\dev\nginx\sites\nami.conf` (reload nginx after changes).

### How nginx finds this project (no `root`)

PHP sites use `root C:/dev/sites/...`. Next.js does **not** — nginx only proxies by hostname → port:

| Piece | Value |
|-------|--------|
| Browser URL | `http://nami.localhost` |
| Nginx `server_name` | `nami.localhost` |
| Nginx `proxy_pass` | `http://127.0.0.1:3000` |
| App process | `npm run dev` inside `C:\dev\sites\Nami` |
| App port | `3000` (`.env` `PORT` + `package.json`) |

So “this is Nami” = **hostname + port + which folder you started Next from**.

**Future Next.js project** (example):

1. Hosts: `127.0.0.1  other.localhost`
2. App: run on **PORT=3001** from `C:\dev\sites\other`
3. Nginx: `server_name other.localhost;` → `proxy_pass http://127.0.0.1:3001;`

Never reuse port `3000` for another local Next app while Nami is running.

## Environment

One file only: **`.env`** (gitignored). Create/edit it locally; on staging/production upload or set the same keys in the host panel.

All environment-specific values live in **`.env` only**. Protocol (`http` / `https`), CSP, HSTS, and origins are derived from `NEXT_PUBLIC_SITE_URL` — never hardcoded in `next.config.ts`.

| Environment | `NEXT_PUBLIC_SITE_URL` | What code does |
|-------------|------------------------|----------------|
| Local | `http://nami.localhost` | CSP allows `http://…:*` + ws for HMR; no HSTS |
| Staging | `https://staging…` | CSP `'self'` (+ extras); HSTS + upgrade-insecure |
| Production | `https://…` | same as staging |

```bash
NEXT_PUBLIC_SITE_URL=http://nami.localhost   # or https://… on servers
PORT=3000
NEXT_PUBLIC_SITE_EMAIL=experience@nami.in
NEXT_PUBLIC_SOCIAL_INSTAGRAM=https://instagram.com/
NEXT_PUBLIC_SOCIAL_WHATSAPP=https://chat.whatsapp.com/
```

## Staging / production

On the server, set `.env` (or host env vars) then:

```bash
NEXT_PUBLIC_SITE_URL=https://your-host.example.com
# Staging while under development:
# NEXT_PUBLIC_SITE_INDEXING=false

npm run build:live
npm run start:live
```

Do not upload `_legacy/`. See **DEVELOPERS.md** for SEO/speed/live checklist.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local on nami.localhost |
| `npm run build:live` | Production build (safer heap on small VPS) |
| `npm run start:live` | Serve production build (safer heap) |
| `npm run build` / `npm start` | Standard build/start |
| `npm run lint` | ESLint |

## Strapi later

Uncomment in `.env` when ready, then implement fetch only in `lib/cms.ts`:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
```

Pages/sections stay the same — CMS swap is isolated.
