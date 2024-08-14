import { defineConfig } from 'vite';

export default defineConfig({
  // ...
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['store'],
  },
  build: {
    sourcemap: true,
  },
  base: './',
  // publicDir: '/assets/',
});
