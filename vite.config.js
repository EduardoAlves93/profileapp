import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['aws-sdk'],
    },
  },
  define: {
    'process.env': process.env,
    global: 'globalThis', // or you can use the global package
  },
});
