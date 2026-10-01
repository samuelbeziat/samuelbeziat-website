import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://samuelbeziat.com',
  base: '/',
  integrations: [sitemap()],
  legacy: {
    collections: true,
  },
});
