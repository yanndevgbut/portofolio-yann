import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: '/storage/emulated/0/porto',
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve('/root/porto-build/node_modules/react'),
      'react-dom': path.resolve('/root/porto-build/node_modules/react-dom'),
      gsap: path.resolve('/root/porto-build/node_modules/gsap')
    }
  },
  build: {
    outDir: '/storage/emulated/0/porto/dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    host: true
  }
})
