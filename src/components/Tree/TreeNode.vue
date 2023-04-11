<template>
  <div class="han-tree-item">
    <div class="tree-text hover:bg-blue/30" cursor-pointer pl-2 rounded-4 flex select-none items-center gap-3 h-8 @click="setExpand()">
      <div w-4 v-if="isExpand"><div v-if="existChildren" :class="node.icon || 'i-carbon-chevron-down'"></div></div>
      <div w-4 v-else><div v-if="existChildren" :class="node.icon || 'i-carbon-chevron-right'"></div></div>
      <TreeNodeContent :node="node"></TreeNodeContent>
    </div>
    <div class="tree-children" :style="{ marginLeft: '1rem' }" v-if="isExpand">
      <han-tree-node :level="level + 1" :node="child" v-for="child in childrenNodes" @node-click="nodeClick" :key="child.id"></han-tree-node>
    </div>
  </div>
</template>

<script setup lang="ts">
import TreeNodeContent from './TreeNodeContent.vue';
import { isEmpty } from 'lodash-es';
import type { TreeItemProps, TreeNode } from './tree.type'

defineOptions({
  name: 'han-tree-node'
})

const { node, level, loadData } = $defineProps<TreeItemProps>()
const emits = defineEmits<SE<{
  nodeClick(val: TreeNode, isExpand: boolean): void
}>>()

node.level = level

const existChildren = $computed(() => !isEmpty(node.children) || node.isLeaf || node.icon)

const isExpand = $computed(() => node.isExpand && existChildren)

const childrenNodes = $computed(() => node.children)

const setExpand = () => {
  node.isExpand = !node.isExpand
  nodeClick(node, node.isExpand)
}
const nodeClick = async (node: TreeNode, expand: boolean) => {
  if (loadData && !node.isLeaf && !node.children) {
    const childNodes = await loadData(node)
    if (isEmpty(childNodes)) {
      node.isLeaf = true
    } else {
      node.children = childNodes
    }
  }
  emits('nodeClick', node, expand)
}
</script>

<style scoped></style>
