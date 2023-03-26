<template>
  <div flex="~ col" items-center content-height>
    <div class="btn-action" flex items-center>
      <va-select
        v-model="drawType"
        label="请选择工具"
        :options="options"
        color="#990099"
        w-30
      />
      <Button theme mr-1 @click="() => canvasTools.rollback()">rollback</Button>
      <Button theme mr-1 @click="() => canvasTools.goon()">go on</Button>
      <Button theme mr-1 @click="() => canvasTools.clear()">clear</Button>
      <Button theme mr-1 @click="() => canvasTools.download()">download</Button>
    </div>
    <div ref="canvas" w-full flex-1></div>
  </div>
</template>

<script setup lang="ts">
import { PaintType } from '@/types/draw';
import { Drawer } from './Draw';

const options = reactive([
  {
    text: "笔",
    value: "PEN",
  },
  {
    text: "长方形",
    value: "RECTANGLE",
  },
  {
    text: "圆形",
    value: "CIRCLE",
  },
  {
    text: "划线",
    value: "LINE",
  },
])

const canvas = $ref<HTMLDivElement>();

let canvasTools = $ref<Drawer>()!;

let drawType = $ref<PaintType>(PaintType.PEN);

onMounted(() => {
  canvasTools = new Drawer(canvas!, {
  })
  canvasTools.paintType = drawType
})

const selectChange = (val: Event) => {
  canvasTools.paintType = drawType!
}
</script>

<style scoped>

</style>
