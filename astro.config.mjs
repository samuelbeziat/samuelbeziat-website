import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://samuelbeziat.github.io',
  base: '/samuelbeziat-website',
  legacy: {
    collections: true,
  },
});
