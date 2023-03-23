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
    ['bg-main', { 'background-color': 'var(--theme-color)' }],
    ['text-main', { 'color': 'var(--theme-color)' }],
    ['bg-main-active', { 'background-color': 'rgba(255, 255, 255, 0.1)' }],
    ['bg-main-hover', { 'background-color': 'rgba(255, 255, 255, 0.2)' }],
    ['content-height', { 'height': 'var(--content-height)' }],
    ['max-content-height', { 'max-height': 'var(--content-height)' }],
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
