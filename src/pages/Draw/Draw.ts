import type { Ref } from "vue";
import { PaintType, type DrawStack } from "@/types/draw";

interface UseCanvasProps {
  height?: number,
  width?: number,
  insert?: Ref<HTMLElement>,
  style?: Partial<CSSStyleDeclaration>,
}
interface Point {
  x: number,
  y: number,
}

export class CanvasTool<T extends HTMLElement = HTMLElement> {
  container: HTMLElement;
  instance: HTMLCanvasElement;
  constructor(container: T, options: UseCanvasProps) {
      this.container = container;
      this.instance = document.createElement('canvas');

      this.createCanvas(options);
  }
  createCanvas(options: UseCanvasProps) {
      this.instance.height = options.height || this.container.offsetHeight;
      this.instance.width = options.width || this.container.offsetWidth;
      if (options.style) {
          for (const key in options.style) {
              this.instance.style[key] = options.style[key] as string;
          }
      }
      if (this.container) {
          this.container.appendChild(this.instance);
      }
  }
  get canvas() {
      return this.instance
  }
  get context() {
      return this.instance.getContext('2d')!;
  }
  clearCanvas() {
      this.context.clearRect(0, 0, this.instance.width, this.instance.height)
  }
  drawLine(x1: number, y1: number, x2: number, y2: number, color: string, lineWidth: number, lineCap: CanvasLineCap = 'round') {
      const { offsetTop: top, offsetLeft: left } = this.instance
      this.context.beginPath();
      this.context.moveTo(x1 - left, y1 - top);
      this.context.lineTo(x2 - left, y2 - top);
      this.context.strokeStyle = color;
      this.context.lineWidth = lineWidth;
      this.context.lineCap = lineCap;
      this.context.closePath();
      this.context.stroke();
  }
  drawLines(list: Point[], color: string, lineWidth: number, lineCap: CanvasLineCap = 'round') {
      for (let i = 0; i < list.length - 1; i++) {
          const move = list[i];
          const to = list[i + 1];
          this.drawLine(move.x, move.y, to.x, to.y, color, lineWidth, lineCap);
      }
  }
  drawCircle(x: number, y: number, r: number, borderWidth: number = 0, borderColor: string = '', color: string = 'rgba(0, 0, 0, 1)') {
      const { offsetTop: top, offsetLeft: left } = this.instance
      this.context.beginPath();
      this.context.arc(x - left, y - top, r, 0, 2 * Math.PI);
      this.context.fillStyle = color;
      this.context.strokeStyle = borderColor;
      this.context.lineWidth = borderWidth;
      this.context.closePath();
      this.context.fill();
  }
  drawRect({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point, borderWidth: number = 0, borderColor: string = '', color: string = 'rgba(0, 0, 0, 1)') {
      const { offsetTop: top, offsetLeft: left } = this.instance
      const height = Math.abs(y1 - y2)
      const width = Math.abs(x1 - x2)
      const x = x1 > x2 ? x2 : x1;
      const y = y1 > y2 ? y2 : y1;

      this.context.beginPath();
      this.context.strokeRect(x - left, y - top, width, height);
      this.context.fillStyle = color;
      this.context.strokeStyle = borderColor;
      this.context.lineWidth = borderWidth;
      this.context.closePath();
      this.context.fill();
  }
  shape(x: number, y: number, r: number, color: string, borderWidth: number = 0, borderColor: string = '') {
      return (currentX: number, currentY: number) => {
          this.context.beginPath();
          this.context.arc(currentX || x, currentY || y, r, 0, 2 * Math.PI);
          this.context.fillStyle = color;
          this.context.strokeStyle = borderColor;
          this.context.lineWidth = borderWidth;
          this.context.fill();
      }
  }
  static getBase64Image(url: string) {
      return new Promise((resolve, reject) => {
          const image = new Image()
          image.src = url + '?v=' + Math.random() // 处理缓存
          image.crossOrigin = '*' // 支持跨域图片
          image.onload = () => {
              const base64 = this.drawBase64Image(image)
              resolve(base64)
          }
          image.onerror = (err) => {
              reject(err)
          }
      })
  }
  static drawBase64Image(img: HTMLImageElement) {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, img.width, img.height)
      return canvas.toDataURL('image/png')
  }
  static getImageData(url: string): Promise<ImageData> {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;

          img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d')!;
              const width = img.width;
              const height = img.height;
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
              const colorData = ctx.getImageData(0, 0, width, height);
              resolve(colorData);
          }
      })
  }
  download() {
      const img = this.instance.toDataURL("image/png");
      const a: HTMLAnchorElement = document.createElement('a');
      a.href = img;
      a.download = "image";
      a.click();
      a.remove();
  }
}

export class Drawer<T extends HTMLElement = HTMLElement> extends CanvasTool {
  private stack: DrawStack = [];
  private step: number = 0;
  private lastPoint: Point = null as any;
  private isDraw: boolean = false;

  public paintType: PaintType = PaintType.PEN;

  public lineWidth: number = 4;
  public lineColor: string = '#000';

  public borderWidth: number = 3;
  public borderColor: string = '#000';

  private mousedown: keyof HTMLElementEventMap = 'mousedown';
  private mousemove: keyof HTMLElementEventMap = 'mousemove';
  private mouseup: keyof HTMLElementEventMap = 'mouseup';

  private isMobile: boolean = this.judgeMobile()

  private mouseMoveTarget = this.mouseMoveEvent.bind(this);
  private mouseDbClickTarget = this.mouseDbClickEvent.bind(this);
  private mouseUpTarget = this.mouseupEvent.bind(this);

  constructor(el: T, options: UseCanvasProps) {
      super(el, options)
      this.initMouseEvent()
  }

  initMouseEvent() {
      this.useInMobile()
      super.canvas.addEventListener(this.mousedown, this.mouseDownEvent.bind(this) as any)
  }
  private mouseDownEvent(e: MouseEvent) {
      const { pageX, pageY } = this.getCurrentPosition(e)
      this.lastPoint = {
          x: pageX,
          y: pageY,
      }
      if (this.isDraw) return;
      this.isDraw = true;

      if (this.step < this.stack.length) {
          this.stack.splice(this.step)
      }
      this.step++;
      this.stack.push({
          type: this.paintType,
          track: [{
              x: pageX,
              y: pageY,
          }]
      })
      super.canvas.addEventListener(this.mousemove, this.mouseMoveTarget as any)
      window.addEventListener('dblclick', this.mouseDbClickTarget as any)
      window.addEventListener(this.mouseup, this.mouseUpTarget as any)
  }
  private mouseMoveEvent(e: MouseEvent) {
      const { pageX, pageY } = this.getCurrentPosition(e)
      switch (this.paintType) {
          case PaintType.PEN:
              this.usePen(pageX, pageY, 'move');
              break;
          case PaintType.RECTANGLE:
          case PaintType.CIRCLE:
              this.useRect(pageX, pageY, 'move');
              break;
          case PaintType.LINE:
              this.useRect(pageX, pageY, 'move');
              break;
          default:
              break;
      }
  }
  private mouseupEvent(e: MouseEvent) {
      if (!this.isDraw) return;
      const { pageX, pageY } = this.getCurrentPosition(e)

      if (this.paintType !== PaintType.LINE) {
          this.isDraw = false;
          window.removeEventListener(this.mouseup, this.mouseUpTarget as any);
      }

      switch (this.paintType) {
          case PaintType.PEN:
              this.usePen(pageX, pageY, 'end');
              break;
          case PaintType.RECTANGLE:
          case PaintType.CIRCLE:
              this.useRect(pageX, pageY, 'end');
              break;
          case PaintType.LINE:
              this.useLine(pageX, pageY, 'next');
              break;
          default:
              break;
      }
  }
  private mouseDbClickEvent({ pageX, pageY }: MouseEvent) {
      if (!this.isDraw) return;
      this.isDraw = false;
      switch (this.paintType) {
          case PaintType.LINE:
              this.useLine(pageX, pageY, 'end');
              break;
          default:
              break;
      }
      window.removeEventListener('dblclick', this.mouseDbClickEvent as any)
  }
  usePen(pageX: number, pageY: number, type: 'move' | 'end') {
      super.drawLine(this.lastPoint.x, this.lastPoint.y, pageX, pageY, this.lineColor, this.lineWidth, 'round')
      this.stack.at(-1)?.track.push({
          x: pageX,
          y: pageY,
      })
      if (type === 'move') {
          this.lastPoint = {
              x: pageX,
              y: pageY,
          }
      } else if (type === 'end') {
          super.canvas.removeEventListener(this.mousemove, this.mouseMoveTarget as any)
      }

  }
  useRect(pageX: number, pageY: number, type: 'move' | 'end') {
      super.clearCanvas();
      this.stack.at(-1)!.track[1] = {
          x: pageX,
          y: pageY,
      }
      this.reloadStack(this.stack)
      if (type === 'end') {
          super.canvas.removeEventListener(this.mousemove, this.mouseMoveTarget as any)
      }
  }
  useLine(pageX: number, pageY: number, type: 'move' | 'end' | 'next') {
      super.clearCanvas();
      if (type === 'next') {
          this.stack.at(-1)!.track.push({
              x: pageX,
              y: pageY,
          })
      } else if (type === 'move') {
          const lastStep = this.stack.at(-1)!.track.at(-1);
          lastStep!.x = pageX
          lastStep!.y = pageY
      } else if (type === 'end') {
          super.canvas.removeEventListener(this.mousemove, this.mouseMoveTarget as any)
      }
      console.log(this.stack);

      this.reloadStack(this.stack)
  }
  rollback() {
      if (!this.stack.length) return;
      super.clearCanvas();
      if (this.step > 0) --this.step;
      this.reloadStack(this.stack.slice(0, this.step))
  }
  goon() {
      if (this.stack.length === this.step) return;
      super.clearCanvas();
      ++this.step;
      this.reloadStack(this.stack.slice(0, this.step))
  }
  clear() {
      super.clearCanvas();
      this.stack = [];
      this.step = 0;
  }
  private reloadStack(stack: DrawStack) {
      for (const { type, track } of stack) {
          switch (type) {
              case PaintType.PEN:
              case PaintType.LINE:
                  super.drawLines(track, this.lineColor, this.lineWidth, 'round')
                  break;
              case PaintType.RECTANGLE:
                  super.drawRect(track[0], track[1], this.borderWidth, this.borderColor)
                  break;
              case PaintType.CIRCLE:
                  super.drawCircle(track[0].x, track[0].y, this.getLengthBetweenPoint(track[0], track[1]), this.borderWidth, this.borderColor)
                  break;
              default:
                  break;
          }
      }
  }
  private getLengthBetweenPoint(point1: Point, point2: Point) {
      const width = Math.abs(point1.x - point2.x);
      const height = Math.abs(point2.y - point2.y);

      return Math.sqrt(width * width + height * height)
  }
  private judgeMobile() {
      return ['iPhone', 'Android'].some(item => navigator.userAgent.includes(item))
  }
  private getCurrentPosition(e: MouseEvent | TouchEvent) {
      if ('touches' in e) {
          return {
              pageX: e.touches[0].pageX,
              pageY: e.touches[0].pageY,
          }
      } else {
          return {
              pageX: e.pageX,
              pageY: e.pageY,
          }
      }
  }
  private useInMobile() {
      if (!this.isMobile) return;
      this.mousedown = 'touchstart'
      this.mousemove = 'touchmove'
      this.mouseup = 'touchend'
  }
}
