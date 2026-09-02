/// <reference types="astro/client" />

interface Env {
  NEON_DATABASE_URL: string;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  LEAD_NOTIFICATION_EMAIL: string;
}

// Astro removed Astro.locals.runtime.env - runtime bindings now come from
// this Cloudflare Workers built-in module instead. Not typed by any
// installed package, so declared by hand here.
declare module "cloudflare:workers" {
  export const env: Env;
}
