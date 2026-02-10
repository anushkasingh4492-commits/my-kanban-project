import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['my-kanban-project.onrender.com'] // This gives Render permission
  },
  preview: {
    allowedHosts: ['my-kanban-project.onrender.com'], // This fixes the specific error you see
    port: 10000,
    host: '0.0.0.0'
  }
})