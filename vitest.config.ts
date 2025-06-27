import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: [
      'tests/unit/**/*.test.ts',
      'tests/components/**/*.test.tsx'
    ],
    css: true,
    globals: true,
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