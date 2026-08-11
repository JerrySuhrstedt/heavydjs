// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: "https://heavydjs.com",
  // Every marketing page stays prerendered. Only the routes that need the
  // database or auth opt out via `export const prerender = false`.
  output: "static",
  adapter: cloudflare(),
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
