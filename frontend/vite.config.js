import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: './',  // ✅ Ensures assets are served correctly
  root: path.resolve(__dirname, './'),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom"] // Added dedupe configuration
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
            if (id.includes('@fortawesome')) return 'vendor-fontawesome';
            return 'vendor';
          }
        }
      }
    },
    external: [
      'react-redux', 
      '@reduxjs/toolkit', 
      'redux-persist',
      'react-router-dom'
    ],
    chunkSizeWarningLimit: 2000
  },
  server: {
    port: 5173,
    fs: {
      allow: ['.', 'node_modules']
    },
    proxy: {
      '/api': {
        target: 'https://maj-25-backend.onrender.com',
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    exclude: ['chunk-F2GNF72Y.js']
  }
});
