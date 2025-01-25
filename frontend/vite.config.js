import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, './'),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@fonts": path.resolve(__dirname, "public/fonts")
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    assetsInclude: ['**/*.woff', '**/*.woff2'],
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: {
          'vendor': [
            // Third party dependencies
            'react',
            'react-dom',
            'react-router-dom'
          ],
          'fonts': [
            // Font awesome imports
            '@fortawesome/fontawesome-free'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase warning limit to 1000kb if needed
  },
  publicDir: 'public',
  server: {
    port: 3000,
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(
          __dirname,
          "node_modules/@fortawesome/fontawesome-free/webfonts"
        ),
      ],
    },
  }
});
