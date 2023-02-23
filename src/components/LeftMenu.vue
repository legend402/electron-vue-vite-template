<template>
  <div class="bg-main" w-60 h-full rounded-r-15>
    <div class="Logo" font-bold text-white text-8 text-center py-3 >
      蜗牛靖子
    </div>
    <div 
      v-for="item in routes" 
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
let activeRoute = $ref('home')

const toNextPage = ({ name }: RouteRecordRaw) => {
  router.push({ name })
  activeRoute = name as string
}

const iconMap = {
  home: 'i-carbon-home',
  parssword: 'i-carbon-password'
}
</script>

<style scoped>

</style>
