<template>
  <div flex="~ col" items-center>
    <div class="btn-action">
      <select v-model="drawType" @change="selectChange">
        <option value="PEN">笔</option>
        <option value="RECTANGLE">长方形</option>
        <option value="CIRCLE">圆形</option>
        <option value="LINE">划线</option>
      </select>
      <button w-20 h-8 bg-blue border-none mr-1 @click="canvasTools.rollback">rollback</button>
      <button w-20 h-8 bg-blue border-none mr-1 @click="canvasTools.goon">go on</button>
      <button w-20 h-8 bg-blue border-none mr-1 @click="canvasTools.clear">clear</button>
      <button w-20 h-8 bg-blue border-none mr-1 @click="canvasTools.download">download</button>
    </div>
    <div ref="canvas" w-full></div>
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
    height: 700
  })
})

const selectChange = (val: Event) => {
  canvasTools.paintType = drawType!
}
</script>

<style scoped>

</style>
