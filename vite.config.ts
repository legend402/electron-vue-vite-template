import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import eleRenderer from 'vite-plugin-electron-renderer'
import AutoImport from 'unplugin-auto-import/vite'
import MacrosVue from 'unplugin-vue-macros/vite'
import Unocss from '@unocss/vite'
import { join, resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    MacrosVue({
      plugins: {
        vue: vue({
          reactivityTransform: true,
        }),
      }
    }),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            outDir: 'dist/electron/main',
          },
        },
      },
      preload: {
        input: {
          index: join(__dirname, 'electron/preload/index.ts'),
        },
        vite: {
          build: {
            sourcemap: 'inline',
            outDir: 'dist/electron/preload',
          },
        },
      },
    }),
    eleRenderer({
      nodeIntegration: true
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/types/auto-imports.d.ts',
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      }
    }),
    Unocss({}),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ]
  }
})
