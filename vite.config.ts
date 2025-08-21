import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      extensions: ['tsx', 'jsx'],
      dirs: 'src/pages',
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
    open: true,
    strictPort: true,
    hmr: {
      overlay: false,
    },
  },
});
