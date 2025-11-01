import { Node, Line } from "@motion-canvas/2d"
import { SimpleSignal, tween, delay, all, ThreadGenerator } from "@motion-canvas/core"

const hsl = (color: number, saturation: number = 60, lightness: number = 60) => {
  return `hsl(${color}, ${saturation}%, ${lightness}%)`
}

const lineColor = hsl(0, 60, 83)

type AnimationClip = { animation: ThreadGenerator, duration: number }

const all_ = (clips: AnimationClip[]) => {
  const duration = Math.max(...clips.map(clip => clip.duration))
  const animation = all(...clips.map(clip => clip.animation))
  return { animation, duration }
}

const delay_ = (startTime: number, clip: AnimationClip): AnimationClip => {
  return {
    animation: delay(startTime, clip.animation),
    duration: startTime + clip.duration
  }
}

const tween_ = (duration: number, callback: (value: number) => void): AnimationClip => {
  return {
    animation: tween(duration, callback),
    duration
  }
}

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

  public fadeIn(): AnimationClip {
    const startBorder = .0
    const dtBorder = 1
    const startNode = startBorder + dtBorder
    const dtNode = .5
    const startLiftUp = startNode + dtNode - .2
    const dtLiftUp = .5
    const dtEdge = startLiftUp +.3
    
    const edgeClip = all_([
      tween_(dtEdge, value => { this.line.end(value) }),
      tween_(0.01, value => { this.line.opacity(value) })
    ])

    return edgeClip
  }
}

