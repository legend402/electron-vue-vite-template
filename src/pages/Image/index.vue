<template>
  <div class="image-action" flex="~ col">
    <div class="btn" mb-6>
      <Button @click="uploadFile" mr-3 :theme="true">选择图片</Button>
      <Button @click="reverseImg('x')" mr-3 v-if="imageUrl" :theme="true">镜像反转</Button>
      <Button @click="reverseImg('y')" v-if="imageUrl" :theme="true">水平翻转</Button>
    </div>
    <img :src="imageUrl" w="80%" alt="">
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import { selectFile, fileToUrl, getImageRect } from '@/utils/fileUtils'
import { createCanvas, getUrlToCanvas } from '@/utils/CanvasUtils'
import { useToast } from 'vuestic-ui'

defineOptions({
  name: 'image-图片操作',
})

const { init } = useToast()

const brand = ref<{
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
}>()
const imageUrl = ref('')

const uploadFile = async () => {
  const file = await selectFile({
    fileType: ['png', 'jpg', 'jpeg']
  })
  imageUrl.value = await fileToUrl(file)

  showImage()
}

const reverseImg = async (orient: 'x' | 'y') => {
  let { ctx, canvas, img } = brand.value!
  ctx = ctx!
  canvas = canvas!
  ctx.clearRect(0, 0, canvas.width, canvas.height);//清除画布
  // 位移来做镜像翻转
  if (orient === 'x') {
    ctx.scale(-1, 1); //左右镜像翻转
    ctx.translate(-canvas.width, 0);
  } else {
    ctx.scale(1, -1); //上下镜像翻转
    ctx.translate(0, -canvas.height);
  }
  imageUrl.value = getUrlToCanvas(canvas, img)
}

const showImage = async () => {
  const { width, height, img } = await getImageRect(imageUrl.value)
  const { canvas, ctx } = createCanvas({ width, height })
  brand.value = {
    canvas,
    ctx,
    img
  }
  
  imageUrl.value = getUrlToCanvas(canvas, img)
}
</script>

<style scoped lang="less">

</style>
