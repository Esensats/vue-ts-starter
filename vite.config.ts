import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unfonts from 'unplugin-fonts/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths(),
    svgLoader(),
    Unfonts({
      google: {
        families: [
          {
            name: 'Open+Sans',
            styles: 'ital,wght@0,300..700;1,300..700'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': fileURLToPath(new URL('./node_modules/bootstrap', import.meta.url))
    }
  },
  server: {
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      '/api/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
