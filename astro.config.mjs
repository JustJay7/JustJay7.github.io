import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is the public address. Change it here when a custom domain is added,
// and every canonical link, social card and sitemap entry follows.
export default defineConfig({
  site: 'https://justjay7.github.io',
  integrations: [sitemap()],
});
