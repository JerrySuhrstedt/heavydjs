# Heavy DJs

Astro site for [heavydjs.com](https://heavydjs.com) — mobile DJ & emcee services for weddings,
corporate events, and private parties in the Phoenix Valley.

Mostly static, with three server-rendered routes on Cloudflare Workers: the lead API, the admin
dashboard, and its CSV export.

## Structure

- `src/pages/` — marketing pages plus a `[slug]` dynamic route that generates the 24 city SEO
  landing pages from `src/data/cities.ts`
- `src/pages/api/lead.ts` — lead capture endpoint (POST)
- `src/pages/admin/index.astro` — password-protected leads dashboard
- `src/components/` — shared layout pieces; `EventForm.astro` is the single form used site-wide
- `src/lib/` — lead validation, admin auth
- `src/data/` — copy content (testimonials, FAQ, features, DJ packages, city list)
- `schema.sql` — D1 table definition

## Commands

| Command             | Action                                        |
| :------------------ | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Astro dev server (no Workers bindings)        |
| `npm run build`     | Build to `./dist/`                            |
| `npx wrangler dev`  | Run the built worker locally, with bindings   |

`npm run dev` is fine for styling work, but the form and admin page need bindings — use
`npx wrangler dev` after a build to exercise those.

---

## One-time setup

These need a Cloudflare login, so they have to be run by the account owner.

### 1. Create the database

```bash
npx wrangler d1 create heavydjs-leads
```

Copy the returned `database_id` into `wrangler.jsonc`, replacing
`PLACEHOLDER_RUN_WRANGLER_D1_CREATE`.

### 2. Create the table

```bash
npx wrangler d1 execute heavydjs-leads --remote --file=./schema.sql
```

### 3. Turn on email sending

Notifications send from `leads@heavydjs.com`, so that domain has to be onboarded first. This adds
DNS records for SPF/DKIM — if the domain is already on Cloudflare it's mostly automatic.

```bash
npx wrangler email sending enable heavydjs.com
npx wrangler email sending list          # confirm it's listed
```

Until this is done, leads still save to the database — only the email notification fails, and
it's logged rather than shown to the visitor.

### 4. Set the admin password

```bash
npx wrangler secret put ADMIN_PASSWORD
```

Pick the password at the prompt. It is never stored in this repo. Until it is set, `/admin/`
stays locked to everyone.

### 5. Deploy

```bash
npm run build && npx wrangler deploy
```

---

## How it works

**Capture.** Every form on the site is the same `EventForm` component — Full Name, Email, Event
Date. It posts to `/api/lead`, which validates, writes to D1, then emails both recipients in
`LEAD_NOTIFY_TO`. The email's reply-to is set to the lead's address, so replying goes straight to
the customer.

A hidden `company` field acts as a honeypot: bots fill it, and those submissions are accepted with
a normal-looking response but never stored.

If the notification email fails, the lead is still saved and the visitor still sees success — the
failure is logged. Losing the record would be worse than losing the alert.

**Viewing.** `/admin/` lists the 500 most recent leads, newest first, with a CSV download at
`/admin/?format=csv`. It's HTTP Basic auth (any username, the password from step 4), marked
`noindex`, and sent with `cache-control: no-store`.

## Local development with bindings

```bash
npm run build
npx wrangler d1 execute heavydjs-leads --local --file=./schema.sql   # once
echo 'ADMIN_PASSWORD=whatever-you-like' > .dev.vars                  # gitignored
npx wrangler dev
```

Local D1 is a separate simulated database — it never touches production data.
