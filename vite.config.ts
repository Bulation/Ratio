import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Ratio/module4/' : '/',
  define: {
    'import.meta.env.SITE_URL': JSON.stringify(
      process.env.NODE_ENV === 'production' ? '/Ratio/module4/' : '/'
    ),
  },
});
