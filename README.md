# Heavy DJs

Astro static site for [heavydjs.com](https://heavydjs.com) — mobile DJ & emcee services for
weddings, corporate events, and private parties in the Phoenix Valley.

## Structure

- `src/pages/` — home, about, dj-services, contact, apparel stubs, and a `[slug]` dynamic route
  that generates the city-specific SEO landing pages from `src/data/cities.ts`
- `src/components/` — shared layout pieces (nav, footer, hero, feature grid, FAQ, etc.)
- `src/data/` — copy content (testimonials, FAQ, features, DJ packages, city list)
- `public/images/` — logo and event photos

## Commands

| Command           | Action                                      |
| :----------------- | :------------------------------------------ |
| `npm install`       | Install dependencies                        |
| `npm run dev`       | Start local dev server                      |
| `npm run build`     | Build the production site to `./dist/`      |
| `npm run preview`   | Preview the production build locally        |

## Deploy

Deployed via Cloudflare (Workers, static assets — see `wrangler.jsonc`). Build command on
Cloudflare must be set to `npm run build`; deploy command is `npx wrangler deploy`.
