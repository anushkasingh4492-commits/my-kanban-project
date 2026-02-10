import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true // This is the "Master Key" that stops the blocking
  },
  preview: {
    allowedHosts: true, // This allows the Render link to work
    port: 10000,
    host: '0.0.0.0'
  }
})