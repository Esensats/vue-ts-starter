// import { fileURLToPath, URL } from 'node:url'
import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unfonts from 'unplugin-fonts/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgLoader from 'vite-svg-loader'
// import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      // EnvironmentPlugin('all'),
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
        '@': path.resolve(__dirname, './src'),
        '~bootstrap': path.resolve(__dirname, './node_modules/bootstrap')
        // '~bootstrap': fileURLToPath(new URL('./node_modules/bootstrap', import.meta.url))
      }
    },
    server: {
      proxy: {
        // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
        '/api/v1': {
          target: process.env.VITE_BACKEND_URL
          // changeOrigin: true,
          // secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  })
}
