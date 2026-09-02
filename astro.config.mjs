// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: "https://heavydjs.com",
  // Every page still prerenders to static HTML by default - only
  // src/pages/api/lead.ts opts out (export const prerender = false) so it
  // can run as a real Worker request handler.
  adapter: cloudflare(),
  integrations: [
    sitemap({
      // The apparel pages are placeholders and the thank-you page is a
      // post-submit destination — neither belongs in search results.
      filter: (page) =>
        !/\/(store|cart|checkout|account|thank-you)\/$/.test(page),
    }),
  ],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
