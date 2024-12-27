import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        // Allow serving files from the project root and the Font Awesome directory
        path.resolve(__dirname),
        path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts')
      ]
    }
  }
});
