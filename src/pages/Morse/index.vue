<template>
  <div>
    <div class="morse-template" flex="~ wrap" justify-center>
      <div class="morse-item w-20% lg:w-10% md:w-15% m-[-0.5px]" v-for="code, text in MorseMap" flex leading-8 border="~ black solid">
        <div class="morse-text" px-2 h-8>{{ text }}</div>
        <div class="morse-code" flex-1 h-8 text-center>{{ code }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MorseMap } from './static'

defineOptions({
  name: 'morse-摩斯密码'
})
</script>

<style scoped>
</style>
