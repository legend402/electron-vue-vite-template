<template>
  <div class="image-action" flex="~ col" items-center>
    <div class="btn" mb-6>
      <Button @click="uploadFile" mr-3 :theme="true">选择图片</Button>
      <Button @click="reverseImg('x')" mr-3 v-if="imageUrl" :theme="true">镜像反转</Button>
      <Button @click="reverseImg('y')" mr-3 v-if="imageUrl" :theme="true">水平翻转</Button>
      <Button @click="rotateImg('left')" mr-3 v-if="imageUrl" :theme="true">向左旋转</Button>
      <Button @click="rotateImg('right')" mr-3 v-if="imageUrl" :theme="true">向右旋转</Button>
      <Button @click="saveImage" mr-3 v-if="imageUrl" :theme="true">保存图片</Button>
    </div>
    <div class="show-place" h-100 w-full border="~ 1 #000 dashed" rounded-12 flex="~ col" justify-center items-center>
      <p text-12 text-main font-sans v-if="!imageUrl">效果展示区</p>
      <p text-2 text-main font-sans v-if="!imageUrl">当前功能用到了浏览器较新api，如点击无反应，请使用chrome，edge浏览器</p>
      <p text-2 text-main font-sans v-if="!imageUrl">当前功能需要使用https访问页面，如当前是http访问，<a href="https://hanyj.top/web/electron/#/image" target="blank">请点击</a></p>
      <img :src="imageUrl" h-full v-else>
    </div>
  </div>
</template>

<script setup lang="ts">
import { selectFile, fileToUrl, getImageRect, createNewFile, saveFile, dataURLtoBlob } from '@/utils/fileUtils'
import { createCanvas, getUrlToCanvas } from '@/utils/CanvasUtils'
import { useToast } from 'vuestic-ui'
import { to } from '@/utils'

defineOptions({
  name: 'image-图片操作',
})

const { init } = useToast()

const brand = ref<{
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  fileName: string,
  fileType: string,
}>()
const imageUrl = ref('')
const currentRotate = ref(0)

const uploadFile = async () => {
  const [file, err] = await to(selectFile({
    fileType: ['png', 'jpg', 'jpeg']
  }))
  if (err) {
    init(err.message)
    return
  }
  const fileName = file.name.split('.')

  imageUrl.value = await fileToUrl(file)

  imageUrl.value && showImage(fileName)
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

const rotateImg = async (direction: 'left' | 'right') => {
  let { ctx, canvas, img } = brand.value!
  ctx = ctx!
  canvas = canvas!

  const { width, height } = img
  direction === 'right' ? currentRotate.value++ : currentRotate.value--

  if (currentRotate.value % 4 === 0) currentRotate.value = 0
  if (currentRotate.value === -1) currentRotate.value = 3

  const degree = currentRotate.value * 90 * Math.PI / 180;
  if ([0, 2].includes(currentRotate.value)) {
    canvas.width = width;
    canvas.height = height;
  } else if ([1, 3].includes(currentRotate.value)) {
    canvas.width = height;
    canvas.height = width;
  }
  ctx.rotate(degree);

  ctx.drawImage(
    img, 
    [2,3].includes(currentRotate.value) ? -width : 0, 
    [1,2].includes(currentRotate.value) ? -height : 0
  );

  imageUrl.value = canvas.toDataURL()
}

const saveImage = async () => {
  const fileHandle = await createNewFile({ fileName: brand.value!.fileName, fileType: brand.value!.fileType, accept: `image/${brand.value!.fileType}` })
  saveFile(fileHandle, dataURLtoBlob(imageUrl.value))
  currentRotate.value = 0
}

const showImage = async ([fileName, fileType]: string[]) => {
  const { width, height, img } = await getImageRect(imageUrl.value)
  const { canvas, ctx } = createCanvas({ width, height })
  brand.value = {
    canvas,
    ctx,
    img,
    fileName,
    fileType
  }

  imageUrl.value = getUrlToCanvas(canvas, img)
}
</script>

<style scoped lang="less"></style>
