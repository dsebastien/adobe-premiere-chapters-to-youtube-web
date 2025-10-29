import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  // Always use '/' since custom domain is configured in GitHub Pages
  base: '/',
  root: 'src',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  server: {
    port: 4200,
    open: true,
    fs: {
      // Allow serving files from dist during development
      allow: ['..'],
    },
  },
});
