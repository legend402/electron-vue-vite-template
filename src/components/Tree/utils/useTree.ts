import type { KeyType, TreeProps } from "../tree.type"

export const useTree = (props: TreeProps) => {
  // 树节点选中列表
  const checkList = reactive<KeyType[]>([])
  // 树子节点订阅setNodeChecked方法的数组
  const subscribeCbs = reactive<((list: KeyType[]) => void)[]>([])

  const setNodeChecked = (nodeList: KeyType[]) => {
    if (props.checkable)
      subscribeCbs.forEach(cb => cb(nodeList))
  }
  return {
    checkList,
    setNodeChecked,
    subscribeCbs,
  }
}
