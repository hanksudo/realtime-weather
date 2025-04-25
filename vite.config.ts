import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [vue()],
    server: {
      port: 3000
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    build: {
      outDir: 'dist'
    }
  }

  // Only use the base path in production build, not in development
  if (command === 'build') {
    return {
      ...config,
      base: '/realtime-weather/' // GitHub Pages repository name
    }
  }

  return config
})
