import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My React PWA',
        short_name: 'ReactPWA',
        description: 'A simple PWA using Vite and React',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/vite.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/vite.svg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
