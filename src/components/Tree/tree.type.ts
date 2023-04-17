import type { ComponentInternalInstance, SetupContext } from "vue"

interface TreeProps {
  nodes: TreeNode[]
  loadData?: (node: TreeNode) => Promise<TreeNode[]>
}

interface TreeItemProps {
  node: TreeNode
  loadData?: (node: TreeNode) => Promise<TreeNode[]>
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
  slots: SetupContext['slots']
}

export type {
  TreeNode,
  TreeItemProps,
  TreeItemEmits,
  TreeProps,
  RootTreeProvide,
}
