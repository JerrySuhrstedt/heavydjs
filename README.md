# Heavy DJs

Astro site for [heavydjs.com](https://heavydjs.com) - mobile DJ & emcee services for
weddings, corporate events, and private parties in the Phoenix Valley.

## Structure

- `src/pages/` - marketing pages plus a `[slug]` dynamic route that generates the 30 city SEO
  landing pages from `src/data/cities.ts`, and `src/pages/api/lead.ts`, the one server route
- `src/components/` - shared layout pieces; `EventForm.astro` is the lead-capture form
- `src/lib/` - server-side helpers used by `api/lead.ts` (Neon insert, Turnstile verification,
  email notification)
- `src/data/` - copy content (testimonials, FAQ, features, DJ packages, city list, business NAP)
- `db/schema.sql` - the Neon `leads` table
- `public/images/` - logo and event photos

## Commands

| Command           | Action                                            |
| :----------------- | :------------------------------------------------ |
| `npm install`      | Install dependencies                              |
| `npm run dev`       | Start local dev server                             |
| `npm run build`     | Build the site to `./dist/`                        |
| `npm run preview`   | Preview the production build locally               |
| `npm run deploy`    | Deploy to Cloudflare (see Deploy below)             |

## Forms

Lead capture is self-hosted: a custom form component posts to `src/pages/api/lead.ts`, which
verifies the submission with Cloudflare Turnstile, writes the lead to a Neon Postgres table
(`db/schema.sql`), and emails a notification via Cloudflare's Email Service. Nothing depends on a
third-party form vendor.

`EventForm` is used on `/contact/`, `/event-information-form/`, every city page's hero, and the
site-wide footer popup. Drop it anywhere else with:

```astro
<EventForm title="Request a Quote" />
```

### Environment variables

Copy `.env.example` to `.env` and `.dev.vars.example` to `.dev.vars`, then fill in real values.
`.env` is build-time/public (baked into the site); `.dev.vars` is runtime/secret, read by the
Cloudflare adapter locally. For local dev, use Cloudflare's official Turnstile test key/secret
(already the default in both example files) rather than the real ones - real Turnstile keys are
scoped to specific hostnames, and `localhost` can hit long domain-propagation delays even when
correctly configured.

Production secrets are set with `npx wrangler secret put <NAME>` (never committed). The one
public/build-time value, `PUBLIC_TURNSTILE_SITE_KEY`, is instead set as a build-time environment
variable in the Cloudflare dashboard (Workers & Pages -> heavydjs -> Settings -> Build).

## Deploy

Cloudflare Workers, via the `@astrojs/cloudflare` adapter - every page still prerenders to static
HTML except `api/lead.ts`. The build output splits into `dist/client` (static assets) and
`dist/server` (the one server route), and the adapter writes a fully resolved, deploy-ready copy
of the wrangler config to `dist/server/wrangler.json` after every build.

- Build command: `npm run build`
- Deploy command: `npm run deploy` (equivalent to `wrangler deploy --config dist/server/wrangler.json`)

Deploying with a bare `wrangler deploy` against the root `wrangler.jsonc` will not work - that
file intentionally omits `main` so `astro build` can resolve its own virtual entrypoint, which
means it isn't deploy-ready on its own. Always deploy through `dist/server/wrangler.json` (or the
`npm run deploy` script, which already points there).
