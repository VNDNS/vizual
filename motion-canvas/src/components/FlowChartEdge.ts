import { Node, Line } from "@motion-canvas/2d"
import { SimpleSignal, tween, delay, all } from "@motion-canvas/core"

const hsl = (color: number, saturation: number = 60, lightness: number = 60) => {
  return `hsl(${color}, ${saturation}%, ${lightness}%)`
}

const lineColor = hsl(0, 60, 83)

interface Edge {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  joints: { id: string, x: number, y: number, s: number, children?: string[] }[]
  points: { x: number, y: number }[]
  sourceId: string | number
  targetId: string | number
}

export class FlowChartEdge {
  
  public line: Line

  private parent: Node
  private edgeData: Edge

  constructor( parent: Node, edgeData: Edge ) {
    this.parent = parent
    this.edgeData = edgeData

    this.initializeLine()
  }

  private initializeLine() {
    const { points } = this.edgeData
    this.line = new Line({ 
      points, 
      stroke: lineColor, 
      lineWidth: 10, 
      lineCap: "round", 
      radius: 50, 
      zIndex: 1000, 
      opacity: 0, 
      key: this.edgeData.id, 
      end: 0 
    })
    this.parent.add(this.line)
  }

  public *fadeIn() {
    const startBorder = .0
    const dtBorder = 1
    const startNode = startBorder + dtBorder
    const dtNode = .5
    const startLiftUp = startNode + dtNode - .2
    const dtLiftUp = .5
    const dtEdge = startLiftUp +.3
    
    yield* all(
      tween(dtEdge, value => { this.line.end(value) }),
      this.line.opacity(1, 0.01)
    )
  }
}

