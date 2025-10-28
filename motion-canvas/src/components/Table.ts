import { Node } from "@motion-canvas/2d"
import { sequence } from "@motion-canvas/core"
import { TableCell } from "./TableCell"
import { TableProps } from "./types/TableProps"
import { TableConfig } from "./types/TableConfig"

export class Table extends Node {

  private config: TableConfig
  private cells: TableCell[][] = []
  private cellWidth: number = 120
  private cellHeight: number = 60

  public constructor(props: TableProps) {
    super({...props, key: props.data.name})

    this.config = props.data

    this.initializeCells()
  }

  private initializeCells() {
    const rows = this.config.data.length
    const cols = this.config.data[0]?.length || 0

    const totalWidth = cols * this.cellWidth
    const totalHeight = rows * this.cellHeight
    const offsetX = -totalWidth / 2 + this.cellWidth / 2
    const offsetY = -totalHeight / 2 + this.cellHeight / 2

    this.x(offsetX)
    this.y(offsetY)

    for (let row = 0; row < rows; row++) {
      const cellRow: TableCell[] = []
      for (let col = 0; col < cols; col++) {
        const value = this.config.data[row][col]
        const cell = new TableCell(this, value, row, col, this.cellWidth, this.cellHeight)
        cellRow.push(cell)
      }
      this.cells.push(cellRow)
    }
  }

  public *fadeIn(duration: number = 0.3, delay: number = 0.05) {
    const animations = []
    
    for (let row = 0; row < this.cells.length; row++) {
      for (let col = 0; col < this.cells[row].length; col++) {
        animations.push(this.cells[row][col].fadeIn(duration))
      }
    }

    yield* sequence(delay, ...animations)
  }
}

