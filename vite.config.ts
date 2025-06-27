import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: 'shri-2025',
  build: {
    outDir: '../dist',
  },
  resolve: {
    alias: {
      '@front': path.resolve(__dirname, 'shri-2025/src'),
      '@utils': path.resolve(__dirname, 'shri-2025/src/utils'),
      '@store': path.resolve(__dirname, 'shri-2025/src/store'),
      '@components': path.resolve(__dirname, 'shri-2025/src/components'),
      '@ui': path.resolve(__dirname, 'shri-2025/src/ui'),
      '@app-types': path.resolve(__dirname, 'shri-2025/src/types'),
    },
  },
}); 