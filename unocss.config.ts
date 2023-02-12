import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  rules: [
    ['bg-main', { 'background-color': 'rgb(112,56,240)' }],
    ['text-main', { 'color': 'rgb(112,56,240)' }],
    ['bg-main-active', { 'background-color': 'rgb(92,41,214)' }],
    ['bg-main-hover', { 'background-color': 'rgba(92,41,214,.8)' }],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    }),
  ],
  transformers: [
    transformerCompileClass(),
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
