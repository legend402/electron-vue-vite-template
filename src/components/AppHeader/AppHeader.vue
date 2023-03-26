<template>
  <header h-15 flex items-center justify-between px-2 :class="[{ 'flex-row-reverse': isWeb }]">
    <div font-bold text-black flex items-center gap-6 pr-3>
      <!-- 侧边栏收缩 -->
      <div class="expand hover:bg-gray/10" cursor-pointer text-main text-lg flex justify-center rounded-lg items-center h-10 w-10
      @click="configStore.toggleExpand()">
        <div v-if="configStore.isExpand" i-carbon-text-indent-more></div>
        <div v-else i-carbon-text-indent-less></div>
      </div>
      <!-- 主题颜色选择 -->
      <ThemeSelect />

      <!-- github地址 -->
      <a text-main class="name" i-carbon-logo-github h-8 w-8 cursor-pointer
      href="https://github.com/legend402" target="_blank"></a>

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
import { useConfigStore } from '@/store/config/useConfigStore';
import { useAppEvent } from '../../utils/hooks/useAppEvent';

defineOptions({
  name: 'AppHeader'
})

const isWeb = import.meta.env.MODE === 'web'

const { windowMax, windowMin, windowClose } = useAppEvent()

const configStore = useConfigStore()
</script>

<style scoped>
.name {
  font-family: MaoKenShiJinHei;
}
</style>
