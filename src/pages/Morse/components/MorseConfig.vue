<template>
  <div mb-3 rounded-2 bg-white p-3 flex="~ wrap" gap-4>
    <label for="split" flex="~ 1" items-center>
      分隔符：
      <input v-model="config.split" id="split" type="text" placeholder="默认为空格" />
    </label>
    <label for="space" flex items-center flex-1>
      空格：
      <input v-model="config.space" id="space" type="text" placeholder="默认为两个空格" />
    </label>
    <label for="dot" flex items-center flex-1>
      短线：
      <input v-model="config.dot" id="dot" type="text" placeholder="默认为 ." />
    </label>
    <label for="line" flex items-center flex-1>
      长线：
      <input v-model="config.line" id="line" type="text" placeholder="默认为 -" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { useMorseInit } from './useMorse'

const { config } = useMorseInit()
</script>

<style scoped>
input {
  @apply: border-none outline outline-[rgba(0, 0, 0, .1)] p-2 rounded flex-1;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, .03);
}
</style>
