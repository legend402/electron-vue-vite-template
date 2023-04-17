<template>
  <div class="han-tree">
    <treeNode :level="0" :node="item" v-for="item in nodes" :key="item.id">
    </treeNode>
  </div>
</template>

<script setup lang="ts">
import type { TreeNode, TreeProps } from './tree.type'
import treeNode from './TreeNode.vue';

defineOptions({
  name: 'han-tree'
})

const { nodes, loadData, checkable } = $defineProps<TreeProps>()

const emits = defineEmits<SE<{
  nodeClick(val: TreeNode, isExpand: boolean): void
  nodeRightClick(val: TreeNode): void
  check(list: TreeNode[], node: TreeNode, checked: boolean): void
}>>()

const slots = useSlots()

const nodeClick = (node: TreeNode, expand: boolean) => {
  emits('nodeClick', node, expand)
}

const nodeRightClick = (node: TreeNode) => {
  emits('nodeRightClick', node)
}

const checkList = reactive([])

provide('root-tree', {
  instance: getCurrentInstance()!,
  slots,
  emits,
  loadData,
  checkable,
  checkList,
})
</script>

<style scoped></style>
