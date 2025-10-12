import { Line, Node, NodeProps } from "@motion-canvas/2d"
import { Color, SimpleSignal, createSignal } from "@motion-canvas/core"

export interface GridProps extends NodeProps {
  gridSize?: number
  width?: number
  height?: number
  stroke?: string | Color
  lineWidth?: number
  opacity?: number
}

export class Grid extends Node {
  private gridSize_: SimpleSignal<number, this>
  private width_: SimpleSignal<number, this>
  private height_: SimpleSignal<number, this>
  private stroke_: SimpleSignal<string | Color, this>
  private lineWidth_: SimpleSignal<number, this>
  private opacity_: SimpleSignal<number, this>

  private horizontalLines: Line[] = []
  private verticalLines: Line[] = []

  public constructor(props: GridProps) {
    super({ ...props })

    this.gridSize_ = createSignal(props.gridSize ?? 50)
    this.width_ = createSignal(props.width ?? 1000)
    this.height_ = createSignal(props.height ?? 1000)
    this.stroke_ = createSignal(props.stroke ?? '#cccccc')
    this.lineWidth_ = createSignal(props.lineWidth ?? 1)
    this.opacity_ = createSignal(props.opacity ?? 0.5)

    this.initializeGrid()
  }

  private initializeGrid() {
    // Clear existing lines
    this.horizontalLines.forEach(line => line.remove())
    this.verticalLines.forEach(line => line.remove())
    this.horizontalLines = []
    this.verticalLines = []

    // Create horizontal lines
    const numHorizontalLines = Math.floor(this.height_() / this.gridSize_()) + 1
    for (let i = 0; i <= numHorizontalLines; i++) {
      const y = i * this.gridSize_()
      const line = new Line({
        points: () => [
          { x: 0, y },
          { x: this.width_(), y }
        ],
        stroke: this.stroke_,
        lineWidth: this.lineWidth_,
        opacity: this.opacity_,
        zIndex: -1,
      })
      this.add(line)
      this.horizontalLines.push(line)
    }

    // Create vertical lines
    const numVerticalLines = Math.floor(this.width_() / this.gridSize_()) + 1
    for (let i = 0; i <= numVerticalLines; i++) {
      const x = i * this.gridSize_()
      const line = new Line({
        points: () => [
          { x, y: 0 },
          { x, y: this.height_() }
        ],
        stroke: this.stroke_,
        lineWidth: this.lineWidth_,
        opacity: this.opacity_,
        zIndex: -1,
      })
      this.add(line)
      this.verticalLines.push(line)
    }
  }

}
