// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://heavydjs.com",
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
