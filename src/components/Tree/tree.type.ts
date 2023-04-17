import type { ComponentInternalInstance, SetupContext } from "vue"

type LoadDataFunc = (node: TreeNode) => Promise<TreeNode[]>

interface TreeProps {
  nodes: TreeNode[]
  loadData?: LoadDataFunc
  checkable?: boolean
}

interface TreeItemProps {
  node: TreeNode
  loadData?: LoadDataFunc
  level: number
}

interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  icon?: string
  isLeaf?: boolean
  level?: number
  isExpand?: boolean
}

interface TreeItemEmits {
  nodeClick(val: TreeNode, isExpand: boolean): void
}

interface RootTreeProvide {
  instance: ComponentInternalInstance,
  slots: SetupContext['slots'],
  emits: SetupContext['emit'],
  loadData?: LoadDataFunc,
  checkable?: boolean,
  checkList: TreeNode[],
}

export type {
  TreeNode,
  TreeItemProps,
  TreeItemEmits,
  TreeProps,
  RootTreeProvide,
}
