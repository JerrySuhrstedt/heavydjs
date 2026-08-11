/// <reference types="astro/client" />
/// <reference path="../worker-configuration.d.ts" />

// ADMIN_PASSWORD is a Cloudflare secret, so it isn't in wrangler.jsonc and
// `wrangler types` can't see it. Declare it here.
//   npx wrangler secret put ADMIN_PASSWORD
declare namespace Cloudflare {
  interface Env {
    ADMIN_PASSWORD?: string;
  }
}
