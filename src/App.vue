<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import LeftMenu from './components/LeftMenu.vue';

</script>

<template>
  <div flex bg-gray-100 class="h-[100vh]">
    <LeftMenu></LeftMenu>
    <div flex-1 flex="col">
      <AppHeader></AppHeader>
      <div class="content-body max-h-[calc(100vh-6rem)]" flex-1 p-3 overflow-auto>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
