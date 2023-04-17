import type { PluginOption } from "vite"
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import AutoComponent from 'unplugin-vue-components/vite'
import MacrosVue from 'unplugin-vue-macros/vite'
import AutoUpload from 'unplugin-ftp-upload/vite'
import CodePosition, { getUseablePort } from 'unplugin-code-position/vite'
import compressPlugin from 'vite-plugin-compression';
import VueJsx from '@vitejs/plugin-vue-jsx'
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
    VueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/types/auto-imports.d.ts',
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      }
    }),
    AutoComponent({
      resolvers: [
        (componentName) => {
          if (componentName.startsWith('Va'))
            return { name: componentName, from: 'vuestic-ui' }
        }
      ],
      dts: 'src/types/components.d.ts',
    }),
    CodePosition({
      port: await getUseablePort(9002)
    }),
    // AutoUpload({
    //   ...require('./auth.json'),
    //   serviceDir: '/root/web/electron',
    //   backupPath: '/root/web/electron_backup',
    //   delay: 5000,
    // }),
    compressPlugin({
      ext: 'gzip',
    }),
    Unocss({}),
  ]

  if (mode !== 'web') {
    
    plugins.push(
      ((await import('vite-plugin-electron')).default as any).default({
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
            index: join(__dirname, '../electron/preload/index.ts'),
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
      })
    )
  }

  return plugins
}

export {
  createPlugins
}
