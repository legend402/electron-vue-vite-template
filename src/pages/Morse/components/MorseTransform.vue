<template>
  <div :class="['compile', { 'flex-row-reverse': bol }]" bg-white p-3 rounded-2 flex items-center font-sans mb-3>
    <div flex-1 text-center>
      <textarea 
        rows="10" v-model="model.secret" 
        placeholder="请输入您要转换的信息"
        :readonly="bol" @input="morseToExplain" 
        :class="[{ 
          'bg-gray-200 cursor-not-allowed focus-visible:outline-none': bol, 
          'outline outline-[rgba(0,0,0,.1)]': !bol 
        }]"
        ></textarea>
      <div class="explain-text">摩斯密文</div>
    </div>

    <div @click="toggle()" i-carbon-arrows-horizontal w-8 mx-2 cursor-pointer font-bold hover:bg-main-hover
      transition-all transition-300></div>

    <div flex-1 text-center>
      <textarea 
        rows="10" v-model="model.explain" 
        placeholder="请输入您要解密的信息"
        :readonly="!bol" @input="explainToSecret"  
        :class="[{ 
          'bg-gray-200 cursor-not-allowed focus-visible:outline-none': !bol, 
          'outline outline-[rgba(0,0,0,.1)]': bol 
        }]"></textarea>
      <div class="explain-text">摩斯明文</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { useMorseComplie } from './useMorse';

const emits = defineEmits(['init'])

const [bol, toggle] = useToggle()

const { 
  morseToExplain, 
  explainToSecret, 
  model,
  reset,
} = useMorseComplie()

onMounted(() => {
  emits('init', reset)
})
</script>

<style scoped>
textarea {
  @apply: w-full p-2 box-border rounded-2 border-none resize-none font-sans text-xl;
}
</style>
