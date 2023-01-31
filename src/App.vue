<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import LeftMenu from './components/LeftMenu.vue';

</script>

<template>
  <div flex bg-white class="h-[100vh]">
    <LeftMenu></LeftMenu>
    <div flex-1 flex="col">
      <AppHeader></AppHeader>
      <router-view flex-1></router-view>
    </div>
  </div>
</template>

<style scoped>
</style>
