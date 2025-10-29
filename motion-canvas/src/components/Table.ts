import { Node, Rect, Txt } from "@motion-canvas/2d"
import { sequence } from "@motion-canvas/core"
import { TableProps } from "./types/TableProps"
import { hsl } from "./hsl"

const COLOR_SCHEMES = {
  blue: {
    color1: hsl(210, 90, 95),
    color2: hsl(210, 85, 80),
    text: hsl(210, 90, 15)
  },
  green: {
    color1: hsl(140, 75, 95),
    color2: hsl(140, 70, 78),
    text: hsl(140, 85, 15)
  },
  purple: {
    color1: hsl(280, 75, 95),
    color2: hsl(280, 70, 80),
    text: hsl(280, 85, 18)
  },
  orange: {
    color1: hsl(30, 90, 95),
    color2: hsl(30, 85, 75),
    text: hsl(30, 90, 20)
  },
  gray: {
    color1: hsl(0, 0, 97),
    color2: hsl(0, 0, 82),
    text: hsl(0, 0, 15)
  }
}

export class Table extends Node {

  private config: TableProps['data']
  private cells: Rect[] = []
  private container: Rect
  private colorScheme: typeof COLOR_SCHEMES[keyof typeof COLOR_SCHEMES]

  public constructor(props: TableProps) {
    super({...props, key: props.data.name})

    this.config = props.data
    
    const schemeName = this.config.colorScheme || 'gray'
    this.colorScheme = COLOR_SCHEMES[schemeName as keyof typeof COLOR_SCHEMES] || COLOR_SCHEMES.gray

    this.initializeContainer()
    this.initializeCells()
  }

  private initializeContainer() {
    const cellWidth = 120
    const cellHeight = 60
    const totalWidth = this.config.columns * cellWidth
    const totalHeight = this.config.rows * cellHeight

    this.container = new Rect({
      width: totalWidth,
      height: totalHeight,
      radius: 5,
    })
    this.add(this.container)
  }

  private initializeCells() {
    const cellWidth = 120
    const cellHeight = 60

    const totalWidth = this.config.columns * cellWidth
    const totalHeight = this.config.rows * cellHeight

    for (let row = 0; row < this.config.rows; row++) {
      for (let col = 0; col < this.config.columns; col++) {
        const x = -totalWidth / 2 + col * cellWidth + cellWidth / 2
        const y = -totalHeight / 2 + row * cellHeight + cellHeight / 2

        const isAlternate = row % 2 === 1
        const cellColor = isAlternate ? this.colorScheme.color2 : this.colorScheme.color1

        const cell = new Rect({
          x,
          y,
          width: cellWidth,
          height: cellHeight,
          fill: cellColor,
          opacity: 0,
        })

        const cellData = this.config.data?.[row]?.[col]
        const cellText = cellData !== undefined && cellData !== null ? cellData.toString() : ''

        const text = new Txt({
          text: cellText,
          fontSize: 24,
          fill: this.colorScheme.text,
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

