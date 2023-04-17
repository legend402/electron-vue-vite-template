<template>
  <Tree :nodes="nodes" @node-click="nodeClick" :loadData="loadData">
    <template #default="{ node }">
      {{ node.label }}
    </template>
  </Tree>

  <VaModal v-model="modalShow" size="large">
    <va-input
      v-model="fileContent"
      type="textarea"
      :label="fileName"
      :min-rows="30"
      :max-rows="30"
    />
  </VaModal>
</template>

<script setup lang="ts">
import { readdir, readFile } from '@/utils/electron/fs';
import type { TreeNode } from '@/components/Tree/tree.type';
import { VaModal } from 'vuestic-ui/web-components';

const nodes = ref<TreeNode[]>([])

const fileName = ref('')
const fileContent = ref('')
const modalShow = ref(false)

onMounted(async () => {
  const data = await readdir('/')
  nodes.value = data.map(({ name, isDir }) => ({
    id: name,
    label: name,
    icon: isDir ? 'i-carbon-folder' : 'i-carbon-document',
    isLeaf: !isDir
  }))
})

const nodeClick = async (node: TreeNode, isExpand: boolean) => {
  if (node.isLeaf) {
    fileHandle(node)
    return
  }
  if (!isExpand) return
  // folderHandle(node)
}

const loadData = async (node: TreeNode) => {
  const data = await readdir('/' + node.id)

  return data.map(({ name, isDir }) => ({
    id: `${node.id}/${name}`,
    label: name,
    icon: isDir ? 'i-carbon-folder' : 'i-carbon-document',
    isLeaf: !isDir
  }))
}

const fileHandle = async (node: TreeNode) => {
  fileName.value = node.label
  const fileString = await readFile('/' + node.id)
  fileContent.value = fileString
  modalShow.value = true
}
</script>

<style scoped>
</style>
