<template>
  <div text-center ref="instance" select-none>
    <p class="yan" text-30 text-main>{{ '(>_<)' }}</p>
    <p text-8 text-main>~~走丢喽~~</p>
  </div>
</template>

<script setup lang="ts">
import { useDrag } from '@/utils/hooks/useDrag';

const instance = ref()

useDrag(instance, {
  target: '.yan',
  top: 90,
  left: 600
})
</script>

<style scoped lang="less">

</style>