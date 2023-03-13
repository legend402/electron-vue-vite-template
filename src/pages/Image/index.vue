<template>
  <div class="image-action">
    <Button @click="uploadFile" :theme="true">选择图片</Button>
    <div class="canvas" ref="canvasRef"></div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import { selectFile, fileToUrl, getImageRect } from '@/utils/fileUtils'
import { createCanvas, drawImageToCanvas } from '@/utils/CanvasUtils'
import { useToast } from 'vuestic-ui'

defineOptions({
  name: 'image-图片操作',
})

const { init } = useToast()

const imageUrl = ref('')
const canvasRef = ref<HTMLDivElement>()

const uploadFile = async () => {
  const file = await selectFile({
    fileType: ['png', 'jpg', 'jpeg']
  })
  imageUrl.value = await fileToUrl(file)

  showImage()
}

const showImage = async () => {
  const { width, height } = await getImageRect(imageUrl.value)
  const { ctx, canvas } = createCanvas({ width, height })
  
  try {
    canvasRef.value!.removeChild(canvasRef.value!.firstChild!)
  } catch (error) {}
  
  canvasRef.value!.appendChild(canvas)

  drawImageToCanvas(ctx, imageUrl.value)
}
</script>

<style scoped lang="less">

</style>