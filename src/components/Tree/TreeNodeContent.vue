<script lang="ts">
import type { PropType } from 'vue';
import type { RootTreeProvide, TreeNode } from './tree.type'
export default defineComponent({
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true,
    },
  },
  setup(props) {
    const node = props.node
    const tree = inject<RootTreeProvide>('root-tree')!
    
    return () => tree.slots.default ? tree.slots.default({ node }) : h('span', { class: 'label' }, [node.label])
  }
})
</script>
