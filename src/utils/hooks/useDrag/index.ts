import type { Ref } from "vue";
import type { DragOptions } from "./draggable";
import type { Overwrite } from '@/utils/types'

import { beDraggable } from "./draggable";
import { isString } from "@vueuse/core";

export interface DragProps extends Overwrite<DragOptions, {
  target: HTMLElement | string
}> {}

export const useDrag = (el: Ref<HTMLElement>, options?: DragProps) => {
  let removeFn = () => {}
  onMounted(() => {
    if (options && isString(options.target)) {
      options.target = el.value.querySelector(options.target)! as HTMLElement
    }
    const { removeListener } = beDraggable(unref(el), options as DragOptions)
    removeFn = removeListener
  })

  onBeforeUnmount(removeFn)
}