<template>
  <div :class="['bg-main', isExpand ? 'min-w-60' : 'min-w-16']" transition-all  h-full rounded-r-15>
    <div class="Logo" flex items-center justify-center font-bold text-white text-8 text-center py-3 pt-8>
       <div i-carbon-face-wink-filled></div> <div overflow-hidden transition-all :class="[isExpand ? 'max-w-60 ml-3' : 'max-w-0 ml-0', 'no-wrap']">蜗牛靖子</div>
    </div>
    <div 
      v-for="item in filterRoutes" 
      :key="item.name"
       flex items-center
       h-10 px-6 my-4 mx-auto
       leading-10 text-white cursor-pointer 
       transition="3 all"
       box-border
       :class="[
          { 'bg-main-active rounded-full': activeRoute === item.name },
          'hover:bg-main-hover rounded-full',
        ]"
       @click="toNextPage(item)">
       <div :class="['i-carbon-'+item.meta?.icon]"></div>
       <div transition-all overflow-hidden :class="[isExpand ? 'max-w-60 ml-3' : 'max-w-0 ml-0', 'no-wrap']">{{ item.meta?.title }}{{ item.meta?.status }}</div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes'
import { useConfigStore } from '@/store/config/useConfigStore';
import type { RouteRecordRaw } from 'vue-router'

defineOptions({
  name: 'LeftMenu'
})

const router = useRouter()

let activeRoute = $ref(location.pathname.replace(import.meta.env.BASE_URL + '/', '') || 'home')

const filterRoutes = computed(() => routes.filter(item => !item.meta?.notInMenu))

const toNextPage = ({ name }: RouteRecordRaw) => {
  router.push({ name })
  activeRoute = name as string
}

const configStore = useConfigStore()

const isExpand = computed(() => configStore.isExpand)

const iconMap = {
  home: 'i-carbon-home',
  password: 'i-carbon-password',
  image: 'i-carbon-aperture',
  draw: 'i-carbon-draw',
  recording: 'i-carbon-recording',
  phone: 'i-carbon-phone',
}
</script>

<style scoped>
.Logo {
  font-family: MaoKenShiJinHei;
}
.no-wrap {
  white-space: nowrap;
}
</style>
