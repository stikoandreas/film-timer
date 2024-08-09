import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/film-timer/',
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        theme_color: 'red',
        name: 'Film Timer',
        short_name: 'Film Timer',
        display: 'standalone',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
    passWithNoTests: true,
  },
});
