import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://samuelbeziat.com',
  base: '/',
  // /flash-de-noel : page cachée, hors sitemap
  integrations: [sitemap({ filter: (page) => !page.includes('/flash-de-noel') })],
  legacy: {
    collections: true,
  },
});
