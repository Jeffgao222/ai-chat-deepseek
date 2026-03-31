import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    allowedHosts: [
      '5173-inmb0kw07q5rhedtx4kmk-2f5fef59.us2.manus.computer',
      'localhost',
      '127.0.0.1',
      '169.254.0.21'
    ]
  }
})
