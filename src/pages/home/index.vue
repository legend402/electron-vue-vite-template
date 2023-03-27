<template>
  <h4 class="title" flex items-center my-2 justify-center text-main text-20 gap-5 leading-10>
    <p>工具箱</p>
    <div i-carbon-tools></div>
  </h4>
  <div h-full flex="~" justify-around items-center relative gap-10 z-2>
    <div v-for="item in imgs" :key="item">
      <img :src="item" alt="">
    </div>
  </div>
  
  <div class="wave bottom-[-30vh]" fixed w="200vw" z-1 left-0 pointer-events="none">
    <WaveSvg></WaveSvg>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'home-首页',
})
const imgs = Object.values(import.meta.glob('@/assets/img/*.png', { eager: true })).map((item: any) => item.default)
</script>

<style scoped>
img {
  @apply: w-full;
}
.title {
  font-family: MaoKenShiJinHei;
}
.wave {
  animation: wave 10s infinite alternate;
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
}
@keyframes wave {
  0% {
    transform: translateX(0) translateY(0);
  }
  100% {
    transform: translateX(-100vw) translateY(20px);
  }
}
</style>
