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

export const getUrlToCanvas = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
  canvas.getContext('2d')!.drawImage(img, 0, 0)
  return canvas.toDataURL()
}
