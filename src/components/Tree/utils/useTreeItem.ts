import type { RootTreeProvide, TreeItemProps, TreeNode, KeyType } from '../tree.type'

export const useTreeItem = (node: TreeNode, props: Partial<TreeItemProps>) => {
  node.level = props.level

  const isCheck = ref(false)

  const tree = inject<RootTreeProvide>('root-tree')!

  function treeNodeChange(list: KeyType[]) {
    isCheck.value = list.includes(node.id)
    toggleNodeCheck(node.id)
  }

  function toggleNodeCheck(id: KeyType) {
    if (isCheck.value) {
      tree.checkList.push(id)
    } else {
      const idx = tree.checkList.indexOf(id)
      idx !== -1 && tree.checkList.splice(idx, 1)
    }
  }
  
  tree.subscribeCbs.push(treeNodeChange)
  
  watch(isCheck, () => {
    toggleNodeCheck(node.id)
    tree.emits('check', tree.checkList, node, isCheck.value)
  })

  onBeforeUnmount(() => {
    tree.subscribeCbs.splice(tree.subscribeCbs.indexOf(treeNodeChange), 1)
  })

  return {
    isCheck,
    tree,
  }
}
