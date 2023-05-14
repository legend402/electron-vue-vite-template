<template>
  <Tree :nodes="nodes" ref="treeRef" @node-click="nodeClick" @check="check" :loadData="loadData">
    <template #default="{ node }">
      <div flex justify-between>
        <span>{{ node.label }}</span>
        <div class="action">
          <va-button preset="plain" mr-2>rename</va-button>
          <va-button preset="plain">delete</va-button>
        </div>
      </div>
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

const treeRef = ref()

const nodes = ref<TreeNode[]>([])
const targetPath = ['/Users', '/Users/Shared', '/Users/Shared/LogiOptionsPlus']

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
}

onMounted(() => {
  setTimeout(() => {
    treeRef.value.setNodeChecked(['var'])
  }, 300)
})

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

const check = (list: TreeNode[], node: TreeNode, check: boolean) => {
  console.log(list, node, check)
}
</script>

<style scoped>
</style>
