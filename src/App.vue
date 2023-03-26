<script setup lang="ts">
import { useModal } from 'vuestic-ui/web-components';

useModal
</script>

<template>
  <div flex bg-gray-100 class="h-[100vh]">
    <LeftMenu></LeftMenu>
    <div flex-1 flex="col">
      <AppHeader></AppHeader>
      <div class="content-body" max-content-height flex-1 p-3 overflow-auto>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
