import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'src/lib/**/*.ts',
        'src/components/ui/**/*.tsx',
        'src/components/sections/ContactForm.tsx',
        'src/components/admin/AdminLoginForm.tsx',
      ],
      exclude: ['src/env.d.ts', '**/*.d.ts'],
      thresholds: {
        lines: 80,
        functions: 90,
        branches: 60,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
});

