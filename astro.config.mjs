import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jaskiratr.github.io',
  base: '/quartz',
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-latte',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
