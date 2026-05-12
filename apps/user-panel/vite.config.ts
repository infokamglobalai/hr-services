import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api/v1/posts': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
      '/api/v1/feed': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
      '/api/v1/ai': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
      '/api/v1/jobs': {
        target: 'http://localhost:3004',
        changeOrigin: true,
      },
      '/api/v1/chat': {
        target: 'http://localhost:3005',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:3005',
        ws: true,
      },
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
