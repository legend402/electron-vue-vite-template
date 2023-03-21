<template>
  <header h-15 flex items-center justify-between px-2 :class="[{ 'flex-row-reverse': isWeb }]">
    <div font-bold text-black flex items-center gap-6 pr-3>
      <div class="var-color" flex gap-3>
        <div @click="changeStyle(item)" v-for="item in colors" :key="item" :style="{ background: item }" h-8 w-8 rounded-full cursor-pointer></div>
      </div>
      <p text-main class="name">my app</p>
    </div>
    <div h-full flex-1 style="-webkit-app-region: drag"></div>
    <div flex gap-1 v-if="!isWeb">
      <div i-carbon-subtract cursor-pointer text-white @click="windowMin"></div>
      <div i-carbon-stop cursor-pointer text-white @click="windowMax"></div>
      <div i-carbon-close cursor-pointer text-white @click="windowClose"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useTheme } from '@/utils/hooks/useTheme';
import { useAppEvent } from '../utils/hooks/useAppEvent';

defineOptions({
  name: 'AppHeader'
})

const isWeb = import.meta.env.MODE === 'web'

const { windowMax, windowMin, windowClose } = useAppEvent()

const { colors, changeStyle } = useTheme()
</script>

<style scoped>
.name {
  font-family: MaoKenShiJinHei;
}
</style>
