<template>
  <div w-37 bg-white h-full>
    <div class="Logo" font-bold text-green text-8 text-center py-3 border="0 b-1 solid gray-50">
      Logo
    </div>
    <div 
      v-for="item in routes" 
      :key="item.name"
       h-10 leading-10 pl-3 cursor-pointer
       transition="3 all"
       hover:bg-gray-100
       :class="[{ 'bg-gray-100': activeRoute === item.name }]"
       @click="toNextPage(item)">{{ item.meta?.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes'
import type { RouteRecordRaw } from 'vue-router'
const router = useRouter()
let activeRoute = $ref('index')

const toNextPage = ({ name }: RouteRecordRaw) => {
  router.push({ name })
  activeRoute = name as string
}
</script>

<style scoped>

</style>