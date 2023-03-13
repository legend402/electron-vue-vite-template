<template>
  <div class="morse">
    <div class="morse-classify" bg-white rounded-3 p-3 mb-3 v-for="classify, text in MorseMap" :key="text">
      <div flex items-center h-10 mb-2 font-sans>
        <div class="bar h-60%" w-1 mr-2 bg-main></div>
        {{ text }}
      </div>
      <div class="morse-template" flex="~ wrap" ml-3 gap-2>
        <div class="morse-item w-20% lg:w-10% md:w-15% m-[-0.5px] rounded-2" v-for="code, text in classify" :key="text" flex
          bg-white leading-8 transition-all hover:scale-105>
          <div class="morse-text" px-2 h-8>{{ text }}</div>
          <div class="divider h-full w-1px ml-2"></div>
          <div class="morse-code" flex-1 h-8 text-center>{{ code }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MorseMap } from '../static'

defineOptions({
  name: 'morse-摩斯密码'
})
</script>

<style scoped>
.morse-item {
  box-shadow:
    0px 0px 3.6px rgba(0, 0, 0, 0.01),
    0px 0px 10px rgba(0, 0, 0, 0.015),
    0px 0px 24.1px rgba(0, 0, 0, 0.02),
    0px 0px 80px rgba(0, 0, 0, 0.03)
  ;
}
.divider {
  box-shadow:
    0px 0px 3.6px rgba(0, 0, 0, 0.2),
    0px 0px 10px rgba(0, 0, 0, 0.3),
    0px 0px 24.1px rgba(0, 0, 0, 0.2),
    0px 0px 80px rgba(0, 0, 0, 0.2)
  ;
}
</style>
