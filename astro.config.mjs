import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://samuelbeziat.com',
  base: '/',
  legacy: {
    collections: true,
  },
});
