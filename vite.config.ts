import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import Pages from 'vite-plugin-pages';

export default defineConfig({
  plugins: [
    react(),
    Pages({
      extensions: ['tsx', 'jsx'],
      dirs: 'src/pages',
      importMode: 'async',
      resolver: 'react',
      routeBlockLang: 'json5',
      extendRoute(route) {
        // ⭐ แปลง path "_404" ให้กลายเป็น path "*"
        if (route.path === '_404') {
          return {
            ...route,
            path: '*',
          };
        }
        return route;
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        format: 'es',
      },
    },
    emptyOutDir: true,
  },
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@elements': path.resolve(__dirname, 'src/elements'),
    },
  },
});
