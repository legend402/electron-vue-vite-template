<script setup lang="ts">
import { useModal, useToast } from 'vuestic-ui/web-components'

const { confirm } = useModal()
const { init } = useToast()

window.confirmFn = confirm
window.toastFn = init
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

<style>
:deep(.va-modal .va-button.va-button--normal) {
  background: var(--theme-color) !important;
}
</style>
