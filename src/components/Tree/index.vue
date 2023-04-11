<template>
  <div class="han-tree">
    <treeNode :level="0" :loadData="loadData" :node="item" v-for="item in nodes" @node-click="nodeClick" :key="item.id">
    </treeNode>
  </div>
</template>

<script setup lang="ts">
import type { TreeNode, TreeProps } from './tree.type'
import treeNode from './TreeNode.vue';

defineOptions({
  name: 'han-tree'
})

const { nodes, loadData } = $defineProps<TreeProps>()

const emits = defineEmits<SE<{
  nodeClick(val: TreeNode, isExpand: boolean): void
}>>()

const slots = useSlots()

const nodeClick = (node: TreeNode, expand: boolean) => {
  emits('nodeClick', node, expand)
}

provide('root-tree', {
  instance: getCurrentInstance()!,
  slots,
})
</script>

<style scoped></style>
