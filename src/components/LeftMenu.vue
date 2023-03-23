<template>
  <div class="bg-main" min-w-60 h-full rounded-r-15>
    <div class="Logo" font-bold text-white text-8 text-center py-3 pt-8>
      蜗牛靖子
    </div>
    <div 
      v-for="item in filterRoutes" 
      :key="item.name"
       flex items-center
       h-10 pl-6 my-4 mx-auto
       leading-10 text-white cursor-pointer 
       transition="3 all"
       :class="[
          { 'bg-main-active rounded-full': activeRoute === item.name },
          'hover:bg-main-hover rounded-full',
          'w-80%'
        ]"
       @click="toNextPage(item)"><div :class="['i-carbon-'+item.meta?.icon]" mr-3></div>{{ item.meta?.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes'
import type { RouteRecordRaw } from 'vue-router'

defineOptions({
  name: 'LeftMenu'
})

const router = useRouter()
let activeRoute = $ref(location.hash.slice(2) || 'home')

const filterRoutes = computed(() => routes.filter(item => !item.meta?.notInMenu))

const toNextPage = ({ name }: RouteRecordRaw) => {
  router.push({ name })
  activeRoute = name as string
}

const iconMap = {
  home: 'i-carbon-home',
  password: 'i-carbon-password',
  image: 'i-carbon-aperture',
  draw: 'i-carbon-draw',
  recording: 'i-carbon-recording',
}
</script>

<style scoped>
.Logo {
  font-family: MaoKenShiJinHei;
}
</style>
