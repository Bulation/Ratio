import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Ratio/module4/' : '/',
  define: {
    'import.meta.env.SITE_URL': JSON.stringify(
      // в import.meta.env.SITE_URL будем добавлять адрес сайта в зависимости от того, находимя ли в девелопмент моде или в продакшн
      process.env.NODE_ENV === 'production' ? '/Ratio/module4/' : '/'
    ),
  },
});
