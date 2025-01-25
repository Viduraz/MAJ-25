import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, './'),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    assetsInclude: ['**/*.woff', '**/*.woff2'],
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/woff|woff2/.test(ext)) {
            return `fonts/[name][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('@fortawesome')) return 'vendor-fontawesome';
            return 'vendor';
          }
        }
      },
      external: ['react-redux', '@reduxjs/toolkit', 'redux-persist']
    },
    chunkSizeWarningLimit: 2000
  },
  publicDir: 'public',
  server: {
    port: 5173,
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(
          __dirname,
          "node_modules/@fortawesome/fontawesome-free/webfonts"
        ),
      ],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
