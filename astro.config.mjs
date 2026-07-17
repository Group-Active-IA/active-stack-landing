import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: set `site` to the final Vercel/custom domain once it's live (needed for canonical URLs + sitemap).
  output: 'static',
  compressHTML: true,
});
