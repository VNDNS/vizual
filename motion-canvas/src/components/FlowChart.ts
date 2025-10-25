import { Rect, Txt, Node, Img, NodeProps, Line, Circle } from "@motion-canvas/2d"
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
  private activations: SimpleSignal<number, this>[]
  private nodes: Rect[] = []
  private borders: Line[] = []
  private edges: Line[] = []
  private images: Img[] = []
  private infos: Node[] = []
  private flowChartNodes: FlowChartNode[] = []

  public constructor(props: FlowChartProps) {
    super({...props, key: props.data.name})

    this.data = props.data
    this.initializeActivations()
    this.initializeNodes()
  }

  private initializeActivations() {
    this.activations = this.data.nodes.map(() => createSignal(0))
  }

  private initializeNodes() {
    for (let i = 0; i < this.data.edges.length; i++) {
      this.initializeEdge(i)
    }
    for (let i = 0; i < this.data.nodes.length; i++) {
      this.initializeNode(i)
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
    const nodeData = this.data.nodes[i]
    const flowChartNode = new FlowChartNode(this, nodeData, this.activations[i])
    
    this.flowChartNodes.push(flowChartNode)
    this.borders.push(flowChartNode.border)
    this.nodes.push(flowChartNode.background)
    this.images.push(flowChartNode.image)
    this.infos.push(flowChartNode.infos)
  }

  public *activate(index: number, duration: number) {
    const edgeData  = this.data.edges[index]
    const edge = this.edges[index]
    const targetNode = edgeData.targetId
    const targetNodeIndex = this.data.nodes.findIndex(n => n.id === targetNode)
    
    const startBorder = .0
    const dtBorder = 1
    const startNode = startBorder + dtBorder
    const dtNode = .5
    const startLiftUp = startNode + dtNode - .2
    const dtLiftUp = .5
    const dtEdge = startLiftUp +.3
    
    yield* all(
      tween(dtEdge, value => { edge.end(value)}),
      edge?.opacity(1, .01),
      this.flowChartNodes[targetNodeIndex].fadeIn(startBorder, dtBorder, startNode, dtNode, startLiftUp, dtLiftUp)
    )

  }

  public *activateRoot(id: number, duration: number) {
    //this.computeBackground(0)
    //this.background.opacity(0)
    //yield* this.nextBackground.opacity(1, 1)
    const dt1 = .5
    const node = this.data.nodes.find(n => n.id === id)
    const nodeIndex = this.data.nodes.findIndex(n => n.id === id)
    this.nodes[nodeIndex].opacity(1)
    yield* all(
      delay(.0, tween(dt1, value => { this.borders[nodeIndex].end(value)})),
      delay(.0, tween(.01, value => { this.borders[nodeIndex].opacity(value)})),
      delay(dt1, tween(dt1, value => { this.nodes[nodeIndex].fill(Color.lerp(new Color('rgb(52,50,57)'), new Color(hsl(0, 60, 38)), value))})),
      delay(dt1, tween(dt1, value => { this.images[nodeIndex]?.opacity(value)})),
      //delay(dt1, this.infos[nodeIndex]?.opacity(1, dt1)),
      delay(dt1, this.activations[nodeIndex](1, dt1)),
    )
    //this.backgroundPaths.removeChildren()
  }

  public *fadeIn(nodes: (string|number)[], duration: number) {
    const animations = []
    for(let i = 0; i < nodes.length; i++) {

      const node = typeof nodes[i] === 'number' ? this.data.nodes.find(n => n.id === nodes[i]) : this.data.nodes.find(n => n.name === nodes[i])
      if(node.parent) {
        const edgeIndex = this.data.edges.findIndex(e => e.targetId === node?.id)
        animations.push(this.activate(edgeIndex, 1))
      } else {
        animations.push(this.activateRoot(node?.id, 1))
      }
    }
    yield* sequence(.3, ...animations)
  }
} 