import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  },
  base: '/vue-login-demo/', // GitHub Pages repository name
  build: {
    outDir: 'dist'
  }
})
