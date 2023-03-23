<template>
  <div :class="['h-button', 'text-white', 'select-none', 'inline-block', 'cursor-pointer', ...classes]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  size: 'small' | 'middle' | 'large',
  radius: 'small' | 'middle' | 'large' | 'rounded',
  type: 'primary',
  theme: boolean,
}>(), {
  size: 'middle',
  radius: 'small',
  type: 'primary',
  theme: false
})

const classes = computed(() => {
  const sizeClass = props.size === 'small' 
    ? 'px-4 py-1' : 
    props.size === 'large' 
    ? 'px-8 py-3' : 'px-6 py-2'

  const roundClass = props.radius === 'small' 
    ? 'rounded' : 
    props.radius === 'large' 
      ? 'rounded-4' : 
      props.radius === 'rounded' 
        ? 'rounded-99' 
        : 'rounded-2'

  const theme = props.theme ? 'bg-main' : ''
  const typeClass = props.type === 'primary' ? 'bg-blue' : 'bg-blue'

  return [sizeClass, props.theme ? theme : typeClass, roundClass]
})
</script>

<style scoped>

</style>
