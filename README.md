# Heavy DJs

Astro static site for [heavydjs.com](https://heavydjs.com) — mobile DJ & emcee services for
weddings, corporate events, and private parties in the Phoenix Valley.

## Structure

- `src/pages/` — marketing pages plus a `[slug]` dynamic route that generates the 24 city SEO
  landing pages from `src/data/cities.ts`
- `src/components/` — shared layout pieces; `EventForm.astro` embeds the Tally form
- `src/data/` — copy content (testimonials, FAQ, features, DJ packages, city list, form ID)
- `public/images/` — logo and event photos

## Commands

| Command           | Action                                 |
| :---------------- | :------------------------------------- |
| `npm install`     | Install dependencies                   |
| `npm run dev`     | Start local dev server                 |
| `npm run build`   | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally   |

## Forms

Lead capture runs on [Tally](https://tally.so). Submissions, email notifications, and exports all
live in the Tally dashboard — nothing is stored in this repo or on Cloudflare.

To connect it, put the form's ID in `src/data/forms.ts`:

```ts
export const TALLY_FORM_ID = "wAbCdE";
```

The ID is the last part of the form's share link — `https://tally.so/r/wAbCdE` → `wAbCdE`.

Until it's set, the form area renders a visible "not connected" notice with the phone number and
email as fallback, so the page never looks broken.

`EventForm` is used on `/contact/` and `/event-information-form/`. Drop it anywhere else with:

```astro
<EventForm title="Request a Quote" />
```

## Deploy

Cloudflare Workers, static assets only (see `wrangler.jsonc`).

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Output directory: `dist`
