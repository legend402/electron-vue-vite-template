<template>
  <div class="var-color" relative>
    <div class="selectColor" :style="{ background: color }" h-8 w-8 rounded-full></div>

    <div class="color-list" transition="all" max-h-0 flex="~ col" gap-3 absolute overflow-hidden>
      <div @click="changeStyle(item)" v-for="item in colors" :key="item" :style="{ background: item }" h-8 w-8
        rounded-full cursor-pointer></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/utils/hooks/useTheme';

const { colors, color, changeStyle } = useTheme()
</script>

<style scoped>
.var-color:hover > .color-list {
  max-height: 40rem;
}

.color-list {
  top: calc(100% + 1rem);
}
</style>
