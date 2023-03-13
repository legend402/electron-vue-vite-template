import { Rect } from "./types"

export const createCanvas = ({ width, height }: Rect) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  return {
    canvas,
    ctx
  }
}

export const drawImageToCanvas = (ctx: CanvasRenderingContext2D, url: string) => {
  ctx.drawImage(url as any, 0, 0)
}