import { defineConfig } from 'vite'
import { resolve } from 'path'
import { createPlugins } from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  return {
    plugins: await createPlugins(mode),
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ]
    },
  }
})
