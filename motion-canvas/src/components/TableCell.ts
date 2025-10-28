import { Rect, Txt, Node } from "@motion-canvas/2d"
import { SimpleSignal, createSignal, tween } from "@motion-canvas/core"
import { Table } from "./Table"


const hsl = (color: number, saturation: number = 60, lightness: number = 60) => {
  return `hsl(${color}, ${saturation}%, ${lightness}%)`
}

const borderColor = hsl(0, 60, 83)
const cellBackground = 'rgb(52,50,57)'

export class TableCell extends Node {
  
  public background: Rect
  public text: Txt

  private cellValue: string | number
  private cellWidth: number
  private cellHeight: number

  constructor(table: Table, value: string | number, row: number, col: number, cellWidth: number, cellHeight: number) {
    super({ key: `cell-${row}-${col}`, x: col * cellWidth, y: row * cellHeight })
    table.add(this)
    
    this.cellValue = value
    this.cellWidth = cellWidth
    this.cellHeight = cellHeight

    this.initializeBackground()
    this.initializeText()
  }

  private initializeBackground() {
    this.background = new Rect({ 
      width: this.cellWidth, 
      height: this.cellHeight, 
      fill: cellBackground, 
      opacity: 0, 
      radius: 0,
      stroke: borderColor,
      lineWidth: 2
    })
    this.add(this.background)
  }

  private initializeText() {
    this.text = new Txt({ 
      text: String(this.cellValue), 
      fontSize: 24, 
      fill: 'white', 
      fontFamily: 'Rubik', 
      fontWeight: 400, 
      opacity: 0 
    })
    this.background.add(this.text)
  }

  public *fadeIn(duration: number = 0.3) {
    yield* tween(duration, value => {
      this.background.opacity(value)
      this.text.opacity(value)
    })
  }
}

