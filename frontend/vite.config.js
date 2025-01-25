import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, './'),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'react-redux',
        '@reduxjs/toolkit',
        'redux-persist',
        'react-router-dom',
        'axios', // Add axios
        'react-switch', // Add react-switch
        'react-hot-toast',
        'firebase/app',
        'firebase/auth',
        'firebase/storage'
      ]
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
