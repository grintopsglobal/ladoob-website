// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Domain kanonik. Harus sama dengan public/CNAME, site_url/display_url di public/admin/config.yml,
// dan ALLOWED_ORIGINS di oauth-proxy/wrangler.toml (lihat README).
const SITE = 'https://ladoob.my.id';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    locales: ['id'],
    defaultLocale: 'id',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Tanpa opsi i18n: slug boleh beda per bahasa, jadi hreflang dipasang di <head> (SEO.astro).
      filter: (page) => /\/id\//.test(page),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
