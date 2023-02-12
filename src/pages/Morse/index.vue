<template>
  <div class="title" px-3 py-2 rounded-2 mb-3 flex justify-between>
    <p my-0 text-2xl text-main font-bold font-sans>摩斯密码互译工具</p>
    <button border-none px-4 py-2 rounded text-white bg-main @click="resetEvent">重置</button>
  </div>
  <MorseTransform @init="initTransform"></MorseTransform>
  <MorseConfig></MorseConfig>
  <MorseTemplate></MorseTemplate>
</template>

<script setup lang="ts">
import MorseTransform from './components/MorseTransform.vue'
import MorseTemplate from './components/MorseTemplate.vue'
import MorseConfig from './components/MorseConfig.vue'

let resetEvent = () => {}

const initTransform = (reset: () => void) => {
  resetEvent = reset
}
</script>

<style scoped>

</style>
