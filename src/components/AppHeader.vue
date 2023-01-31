<template>
  <header bg-green h-10 flex items-center justify-between px-2>
    <div text-white font-bold>my app</div>
    <div h-full flex-1 style="-webkit-app-region: drag"></div>
    <div flex gap-1>
      <div i-carbon-subtract cursor-pointer text-white @click="windowMin"></div>
      <div i-carbon-stop cursor-pointer text-white @click="windowMax"></div>
      <div i-carbon-close cursor-pointer text-white @click="windowClose"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAppEvent } from '../utils/hooks/useAppEvent';

defineOptions({
  name: 'AppHeader'
})

const { windowMax, windowMin, windowClose } = useAppEvent()
</script>

<style scoped>

</style>