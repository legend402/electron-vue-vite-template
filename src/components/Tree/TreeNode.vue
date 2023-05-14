<template>
  <div class="han-tree-item">
    <div class="tree-text hover:bg-blue/30" cursor-pointer px-2 rounded-4 flex select-none items-center gap-3 h-8 @mouseup="rightClick" @click="setExpand()">
      <va-checkbox v-if="tree.checkable" v-model="isCheck" @click.stop />
      <div w-4 v-if="isExpand"><div v-if="existChildren" :class="node.icon || 'i-carbon-chevron-down'"></div></div>
      <div w-4 v-else><div v-if="existChildren" :class="node.icon || 'i-carbon-chevron-right'"></div></div>
      <div class="content" flex-1>
        <TreeNodeContent :node="node"></TreeNodeContent>
      </div>
    </div>
    <div class="tree-children" ref="childRef" :style="{ marginLeft: '1rem' }" v-show="isExpand">
      <han-tree-node :level="level + 1" :node="child" v-for="child in node.children" @node-click="nodeClick" :key="child.id"></han-tree-node>
    </div>
  </div>
</template>

<script setup lang="ts">
import TreeNodeContent from './TreeNodeContent.vue';
import { isEmpty } from 'lodash-es';
import type { TreeItemProps, TreeNode } from './tree.type'
import { useTreeItem } from './utils/useTreeItem'
import { to } from '@/utils';

defineOptions({
  name: 'han-tree-node'
})

const { node, level } = $defineProps<TreeItemProps>()
const { isCheck, tree } = useTreeItem(node, { level })

const childRef = ref<HTMLDivElement>()

const existChildren = $computed(() => !isEmpty(node.children) || node.isLeaf || node.icon)
const isExpand = $computed(() => node.isExpand && existChildren)

const setExpand = () => {
  if (!node.isLeaf) {
    node.isExpand = !node.isExpand
    nodeClick(node, node.isExpand)
    return
  }
  tree.emits('nodeClick', node, isExpand)
}
const nodeClick = async (node: TreeNode, expand: boolean) => {
  // 懒加载子节点
  if (tree.loadData && !node.isLeaf && !node.children) {
    const [childNodes] = await to(tree.loadData(node))
    if (isEmpty(childNodes)) {
      node.isLeaf = true
    } else {
      node.children = childNodes
    }
  }
  tree.emits('nodeClick', node, expand)
}

const rightClick = (e: MouseEvent) => {
  // 右键点击
  if (e.button === 2)
    tree.emits('nodeRightClick', node, { x: e.pageX, y: e.pageY })
}

</script>

<style scoped>
</style>
