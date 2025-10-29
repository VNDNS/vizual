import { Node, Rect, Txt } from "@motion-canvas/2d"
import { sequence } from "@motion-canvas/core"
import { TableProps } from "./types/TableProps"
import { hsl } from "./hsl"

export class Table extends Node {

  private config: TableProps['data']
  private cells: Rect[] = []
  private container: Rect

  public constructor(props: TableProps) {
    super({...props, key: props.data.name})

    this.config = props.data

    this.initializeContainer()
    this.initializeCells()
  }

  private initializeContainer() {
    const cellWidth = 120
    const cellHeight = 60
    const borderWidth = 2
    const totalWidth = this.config.columns * cellWidth + (this.config.columns + 1) * borderWidth
    const totalHeight = this.config.rows * cellHeight + (this.config.rows + 1) * borderWidth

    this.container = new Rect({
      width: totalWidth,
      height: totalHeight,
      fill: hsl(0, 0, 95),
      stroke: hsl(0, 0, 70),
      lineWidth: borderWidth,
      radius: 5,
    })
    this.add(this.container)
  }

  private initializeCells() {
    const cellWidth = 120
    const cellHeight = 60
    const borderWidth = 2

    const totalWidth = this.config.columns * cellWidth + (this.config.columns + 1) * borderWidth
    const totalHeight = this.config.rows * cellHeight + (this.config.rows + 1) * borderWidth

    for (let row = 0; row < this.config.rows; row++) {
      for (let col = 0; col < this.config.columns; col++) {
        const x = -totalWidth / 2 + borderWidth + col * (cellWidth + borderWidth) + cellWidth / 2
        const y = -totalHeight / 2 + borderWidth + row * (cellHeight + borderWidth) + cellHeight / 2

        const cell = new Rect({
          x,
          y,
          width: cellWidth,
          height: cellHeight,
          fill: hsl(0, 0, 100),
          stroke: hsl(0, 0, 80),
          lineWidth: 1,
          opacity: 0,
        })

        const cellData = this.config.data?.[row]?.[col]
        const cellText = cellData !== undefined && cellData !== null ? cellData.toString() : ''

        const text = new Txt({
          text: cellText,
          fontSize: 24,
          fill: hsl(0, 0, 20),
          fontFamily: 'Rubik',
          fontWeight: 400,
        })

        cell.add(text)
        this.container.add(cell)
        this.cells.push(cell)
      }
    }
  }

  public *fadeIn(duration: number) {
    const cellFadeIns = []

    for (let i = 0; i < this.cells.length; i++) {
      cellFadeIns.push(this.fadeInCell(i, 0.3))
    }

    yield* sequence(0.05, ...cellFadeIns)
  }

  private *fadeInCell(index: number, duration: number) {
    yield* this.cells[index].opacity(1, duration)
  }
}

