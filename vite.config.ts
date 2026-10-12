import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/ntu-study-explorer-v2/',
  plugins: [react(), tailwindcss()],
  server: { headers: { 'Referrer-Policy': 'strict-origin-when-cross-origin' } },
  preview: { headers: { 'Referrer-Policy': 'strict-origin-when-cross-origin' } },
  test: { include: ['tests/**/*.test.ts'] },
})
