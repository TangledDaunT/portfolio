import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Static pages live in public/; keep them out of the dep pre-bundler's entry glob.
  optimizeDeps: {
    entries: ['index.html']
  },
  server: {
    port: 5173,
    open: true
  }
});
