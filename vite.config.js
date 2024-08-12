import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
    global: 'globalThis',
  },
  build: {
    minify: 'terser', // Use Terser for minification
    terserOptions: {
      keep_classnames: true, // Keep class names during minification
      keep_fnames: true,     // Keep function names during minification
    }
  },
});
