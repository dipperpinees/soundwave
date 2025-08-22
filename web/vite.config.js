import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  define: {
    global: 'globalThis',
    'process.env': {
      REACT_APP_API: process.env.VITE_API || process.env.REACT_APP_API,
      REACT_APP_GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
