export interface Point {
  x: number,
  y: number,
}

export enum PaintType {
  PEN = 'PEN',
  LINE = 'LINE',
  CIRCLE = 'CIRCLE',
  SQUARE = 'SQUARE',
  ANGLE = 'ANGLE',
  RECTANGLE = 'RECTANGLE',
}
type PaintTypeKey = 'PEN' 
export interface DrawStackItem {
  type: PaintType,
  track: Point[]
}

export type DrawStack = DrawStackItem[]
