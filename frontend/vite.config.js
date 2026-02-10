import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['my-kanban-project.onrender.com'] 
  },
  preview: {
    allowedHosts: ['my-kanban-project.onrender.com'],
    port: 10000,
    host: '0.0.0.0'
  }
})