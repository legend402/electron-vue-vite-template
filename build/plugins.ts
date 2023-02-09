import type { PluginOption } from "vite"
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import MacrosVue from 'unplugin-vue-macros/vite'
import Unocss from '@unocss/vite'
import { join } from 'path'

async function createPlugins(mode: string) {
  const plugins: PluginOption[] = [
    MacrosVue({
      plugins: {
        vue: vue({
          reactivityTransform: true,
        }),
      }
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
  ]

  if (mode !== 'web') {
    plugins.push((await import('vite-plugin-electron')).default({
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
    (await import('vite-plugin-electron-renderer')).default({
      nodeIntegration: true
    }))
  }

  return plugins
}

export {
  createPlugins
}
