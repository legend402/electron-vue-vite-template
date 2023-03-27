import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { createPlugins } from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root)

  return {
    base: env.VITE_BASE_URL,
    plugins: await createPlugins(mode),
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ]
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vuestic: ['vuestic-ui'],
          }
        }
      },
      chunkSizeWarningLimit: 500,
    },
    server: {
    }
  }
})
