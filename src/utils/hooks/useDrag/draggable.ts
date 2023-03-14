
interface Param {
  baseTop: number; // 鼠标Y轴初始位置
  baseLeft: number; // 鼠标X轴初始位置
  boxLeft: number; // 元素left初始位置
  boxTop: number; // 元素top初始位置
  borderTop: number; // 上侧边界
  borderLeft: number; // 左侧边界
  borderRight: number;
  borderBottom: number;
}

export interface DragOptions {
  target?: HTMLElement
  left?: number,
  top?: number
}

export function beDraggable(el: HTMLElement, {
  target = el,
  left,
  top,
}: DragOptions = {}) {
  const param: Param = {
    baseTop: 0, // 鼠标Y轴初始位置
    baseLeft: 0, // 鼠标X轴初始位置
    boxLeft: left || el.offsetLeft, // 元素left初始位置
    boxTop: top || el.offsetTop, // 元素top初始位置
    borderTop: 0, // 上侧边界
    borderLeft: 0, // 左侧边界
    get borderRight() { // 右侧边界
      return document.documentElement.clientWidth - el.offsetWidth
    },
    get borderBottom() { // 下侧边界
      return document.documentElement.clientHeight - el.offsetHeight
    }
  }
  // 初始化样式
  setStyle(el, {
    position: 'absolute',
    margin: '0',
    left: param.boxLeft + 'px',
    top: param.boxTop + 'px',
  })
  
  const mousemoveFn = getMousemoveFn(el, param)

  function mouseupFn() {
    document.removeEventListener('mousemove', mousemoveFn)
    document.removeEventListener('mouseup', mouseupFn)
  }

  target.addEventListener('mousedown', mouseDownFn)

  function mouseDownFn(e: MouseEvent) {
    // 初始化param的位置信息
    initParams(el, e)

    document.addEventListener('mousemove', mousemoveFn)
    document.addEventListener('mouseup', mouseupFn)
  }

  function initParams(el: HTMLElement, e: MouseEvent) {
    const { top, left } = el.getBoundingClientRect()
    param.baseLeft = e.clientX
    param.baseTop = e.clientY
    param.boxLeft = left
    param.boxTop = top
  }

  return {
    removeListener() {
      target.removeEventListener('mousedown', mouseDownFn)
    }
  }
}

function getMousemoveFn(el: HTMLElement, param: Param) {
  return function mousemoveFn({ clientX, clientY }: MouseEvent) {
    const { baseLeft, baseTop, boxLeft, boxTop, borderBottom, borderLeft, borderRight, borderTop } = param
    // 计算移动距离
    const distanceX = clientX - baseLeft
    const distanceY = clientY - baseTop
    // 计算实际移动到的点位
    let finalLeft = boxLeft + distanceX
    let finalTop = boxTop + distanceY
    // 边界处理
    if (finalLeft < borderTop) finalLeft = borderTop
    if (finalTop < borderLeft) finalTop = borderLeft
    if (finalLeft > borderRight) finalLeft = borderRight
    if (finalTop > borderBottom) finalTop = borderBottom

    setStyle(el, {
      left: finalLeft + 'px',
      top: finalTop + 'px'
    })
  }
}
// 设置样式
function setStyle(el: HTMLElement, object: Partial<CSSStyleDeclaration>) {
  for (const key in object) {
    el.style[key] = object[key] as string
  }
}
