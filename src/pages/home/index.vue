<template>
  <h4 flex items-center my-2 justify-center text-main text-20 gap-5 leading-10>
    <p>工具箱</p>
    <div i-carbon-tools></div>
  </h4>
  <div h-full flex="~" justify-around items-center gap-10>
    <div v-for="item in imgs" :key="item">
      <img :src="item" alt="">
    </div>
  </div>
  
  <div class="wave mx-[-0.75rem] bottom-[-.25rem]" fixed w-full left-0>
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
h3 {
  font-family: MaoKenShiJinHei;
}

</style>
