import { Rect, Txt, Node, Img, NodeProps, Line, Circle, NODE_NAME } from "@motion-canvas/2d"
import { Color, SimpleSignal, all, createSignal, delay, sequence, tween } from "@motion-canvas/core"
import { textColor } from "../../../frontend/plugins/animation/constants"
import { Point } from "./functions/Point"
import { computeBackground } from "./functions/computeBackground"
import { getSharedPoints, interpolateShapes } from "./functions/interpolateShapes"
import { rotateArray } from "./functions/rotateArray"
import { backgroundPaths } from "../../../debug"
import { convexHull } from "./functions/convexHull"
import { offsetPoints } from "./functions/offsetPoints"
import { voronoiDiagram } from "./functions/voronoiDiagram"
import { mergeCells } from "./functions/mergeVertices"
import { FlowChartNode } from "./FlowChartNode"

export const hsl = (color: number, saturation: number = 60, lightness: number = 60) => {
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

interface Nodes {
  id: number
  name: string
  x: number
  y: number
  year: number
  parent: number | string
  children: (number | string)[]
  image?: string
  type: 'square' | 'circle'
  componentId: number
  infos?: { name: string, id: string }[]
}

interface FlowChartProps extends NodeProps {
  data: { nodes: Nodes[], edges: Edge[], name: string }
}

export class FlowChart extends Node {

  private data: { nodes: Nodes[], edges: Edge[], name: string }
  private activations: SimpleSignal<number, this>[] = []
  private edges: Line[]   = []
  private nodes: FlowChartNode[] = []

  public constructor(props: FlowChartProps) {
    super({...props, key: props.data.name})

    this.data = props.data
    this.initializeActivations()
    this.initializeNodes()
    this.initializeEdges()
  }

  private initializeActivations() {
    this.activations = this.data.nodes.map(() => createSignal(0))
  }

  private initializeNodes() {
    for (let i = 0; i < this.data.nodes.length; i++) {
      this.initializeNode(i)
    }
  }

  private initializeEdges() {
    for (let i = 0; i < this.data.edges.length; i++) {
      this.initializeEdge(i)
    }
  }

  private initializeEdge(i: number) {
    const edgeData = this.data.edges[i]
    const { points } = edgeData

    const edge = new Line({ points, stroke: lineColor,lineWidth: 10, lineCap: "round", radius: 50, zIndex: 1000, opacity: 0, key: edgeData.id, end: 0 })
    
    this.add(edge)  
    this.edges.push(edge)
  }

  private initializeNode(i: number) {
    const flowChartNode = new FlowChartNode(this, this.data.nodes[i], this.activations[i])
    this.nodes.push(flowChartNode)
  }

  public *activate(nodeName: string, duration: number) {
    const targetNode = this.data.nodes.find(n => n.name === nodeName)
    let edgeAnimations: any = []
    
    const startBorder = .0
    const dtBorder = 1
    const startNode = startBorder + dtBorder
    const dtNode = .5
    const startLiftUp = startNode + dtNode - .2
    const dtLiftUp = .5
    const dtEdge = startLiftUp +.3
    
    if(targetNode.parent) {
      const edgeIndex       = this.data.edges.findIndex(e => e.targetId === targetNode?.id)
      const edge            = this.edges[edgeIndex]
      edgeAnimations = [
        tween(dtEdge, value => { edge.end(value)}),
        edge?.opacity(1, .01),
      ]
    }

    const nodeIndex = this.data.nodes.findIndex(n => n.id === targetNode?.id)
    
    yield* all(
      ...edgeAnimations,
      this.nodes[nodeIndex].fadeIn()
    )
  }

  public *fadeIn(nodeNames: (string)[], duration: number) {
    
    const animations = []
    
    for(let i = 0; i < nodeNames.length; i++) {
      animations.push(this.activate(nodeNames[i], 1))
    }

    yield* sequence(.3, ...animations)
  }
} 