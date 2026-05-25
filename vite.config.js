import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://10.147.19.29:8080',
        changeOrigin: true,
        headers: {
          'Origin': 'http://10.147.19.29:8080'
        }
      }
    }
  }
})