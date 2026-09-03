/// <reference types="astro/client" />

interface SendEmailMessage {
  replyTo?: string | { email: string; name?: string };
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

interface SendEmailBinding {
  send(message: SendEmailMessage): Promise<{ messageId: string }>;
}

interface Env {
  NEON_DATABASE_URL: string;
  TURNSTILE_SECRET_KEY: string;
  LEAD_NOTIFICATION_EMAIL: string;
  EMAIL: SendEmailBinding;
}

// Astro removed Astro.locals.runtime.env - runtime bindings now come from
// this Cloudflare Workers built-in module instead. Not typed by any
// installed package, so declared by hand here.
declare module "cloudflare:workers" {
  export const env: Env;
}
