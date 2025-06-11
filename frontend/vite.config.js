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
            if (id.includes('@fortawesome')) ;
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
        target: 'http://35.232.49.147:3000', 
        changeOrigin: true,
        secure: false,
        timeout: 60000,
        retries: 3,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
 
});
