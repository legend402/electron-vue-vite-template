<template>
  <div flex="~ col" items-center content-height>
    <div class="btn-action">
      <select v-model="drawType" @change="selectChange">
        <option value="PEN">笔</option>
        <option value="RECTANGLE">长方形</option>
        <option value="CIRCLE">圆形</option>
        <option value="LINE">划线</option>
      </select>
      <Button theme mr-1 @click="() => canvasTools.rollback()">rollback</Button>
      <Button theme mr-1 @click="() => canvasTools.goon()">go on</Button>
      <Button theme mr-1 @click="() => canvasTools.clear()">clear</Button>
      <Button theme mr-1 @click="() => canvasTools.download()">download</Button>
    </div>
    <div ref="canvas" w-full flex-1></div>
  </div>
</template>

<script setup lang="ts">
import type { PaintType } from '@/types/draw';
import { Drawer } from './Draw';

const canvas = $ref<HTMLDivElement>();

let canvasTools = $ref<Drawer>()!;

let drawType = $ref<PaintType>();

onMounted(() => {
  canvasTools = new Drawer(canvas!, {
  })
})

const selectChange = (val: Event) => {
  canvasTools.paintType = drawType!
}
</script>

<style scoped>

</style>
