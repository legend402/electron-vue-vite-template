<template>
  <div class="han-tree">
    <treeNode :level="0" :node="item" v-for="item in nodes" :key="item.id">
    </treeNode>
  </div>
</template>

<script setup lang="ts">
import type { TreeNode, TreeProps } from './tree.type'
import treeNode from './TreeNode.vue';
import { useTree } from './utils/useTree'

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
const { checkList, setNodeChecked, subscribeCbs, setNodeExpand } = useTree({ nodes, checkable })

provide('root-tree', {
  instance: getCurrentInstance()!,
  slots, 
  emits,
  loadData,
  checkable,
  checkList,
  subscribeCbs,
})

defineExpose({ 
  setNodeChecked,
  setNodeExpand,
})
</script>

<style scoped></style>
