<template>
  <div flex="~ col" content-height>
    <div class="btn-action" flex gap-3 mb-3>
      <Button theme @click="startRecord">开始录屏</Button>
      <Button theme @click="stopRecord">结束录屏</Button>
      <Button theme @click="downloadRecord">下载录象(mp4)</Button>
    </div>
    <video ref="videoRef" w-full h-80vh border="1 dashed" rounded-10>
      
    </video>
  </div>
</template>

<script setup lang="ts">
import { useRecording } from '@/utils/hooks/useRecording'
const videoRef = ref<HTMLVideoElement>()

const { startRecord, stopRecord, downloadRecord } = useRecording(videoRef)
</script>

<style scoped></style>
