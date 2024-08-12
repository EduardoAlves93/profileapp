import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';
import global from 'global';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
    global: 'globalThis', // or you can use the global package
  },
});
