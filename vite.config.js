import { defineConfig } from 'vite';

export default defineConfig({
  // ...
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['store'],
  },
  base: './',
  // publicDir: '/assets/',
});
