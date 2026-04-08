import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_URL_BASE,
    plugins: [
      react(),
      svgr()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
})

