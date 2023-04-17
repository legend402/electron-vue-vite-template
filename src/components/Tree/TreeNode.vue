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
    <div class="tree-children" :style="{ marginLeft: '1rem' }" v-if="isExpand">
      <han-tree-node :level="level + 1" :node="child" v-for="child in childrenNodes" @node-click="nodeClick" :key="child.id"></han-tree-node>
    </div>
  </div>
</template>

<script setup lang="ts">
import TreeNodeContent from './TreeNodeContent.vue';
import { isEmpty } from 'lodash-es';
import type { RootTreeProvide, TreeItemProps, TreeNode } from './tree.type'

defineOptions({
  name: 'han-tree-node'
})

const { node, level } = $defineProps<TreeItemProps>()

const isCheck = ref(false)

const tree = inject<RootTreeProvide>('root-tree')!

node.level = level

const existChildren = $computed(() => !isEmpty(node.children) || node.isLeaf || node.icon)

const isExpand = $computed(() => node.isExpand && existChildren)

const childrenNodes = $computed(() => node.children)

const setExpand = () => {
  node.isExpand = !node.isExpand
  nodeClick(node, node.isExpand)
}
const nodeClick = async (node: TreeNode, expand: boolean) => {
  if (tree.loadData && !node.isLeaf && !node.children) {
    const childNodes = await tree.loadData(node)
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

watch(isCheck, () => {
  if (isCheck.value) {
    tree.checkList.push(node)
  } else {
    const idx = tree.checkList.indexOf(node)
    idx !== -1 && tree.checkList.splice(idx, 1)
  }
  tree.emits('check', tree.checkList, node, isCheck.value)
})
</script>

<style scoped></style>
