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

const lineColor = '#9898b3'

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

export const hsl = (color: number, saturation: number = 60, lightness: number = 60) => {
  return `hsl(${color}, ${saturation}%, ${lightness}%)`
}

export class FlowChart extends Node {


  private data: { nodes: Nodes[], edges: Edge[], name: string }
  private activations: SimpleSignal<number, this>[]
  private edgeActivations: SimpleSignal<number, this>[]
  private nodes: Rect[]
  private borders: Line[]
  private edges: Line[]
  private images: Img[]
  private infos: Node[]
  private background: Line | null
  private nextBackground: Line | null
  private pathsActivation: any
  private backgroundPaths: Node

  public constructor(props: FlowChartProps) {
    super({...props, key: props.data.name})


    this.data = props.data


    this.background = null
    this.nextBackground = null
    this.nodes = []
    this.pathsActivation = createSignal(0)
    this.borders = []
    this.backgroundPaths = new Node({key: 'backgroundPaths', opacity: backgroundPaths ? 1 : 0})
    this.add(this.backgroundPaths)
    this.edges = []
    this.images = []
    this.infos = []
    this.initializeActivations()
    //this.initializeBackground()
    this.initializeNodes()
  }

  private initializeActivations() {
    this.activations = this.data.nodes.map((_, i) => createSignal(i === 0 ? 0 : 0))
    this.edgeActivations = this.data.edges.map(() => createSignal(0))
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

    const edge = new Line({
      points: () => points,
      stroke: hsl(0,60,83),
      lineWidth: 10,
      lineCap: "round",
      radius: 50,
      zIndex: 1000,
      opacity: 0,
      key: edgeData.id,
      end: 0,
    })
    this.add(edge)  
    this.edges.push(edge)
  }

  // ----------------------------------------------- //

  private computeBackground(index: number) {
    
    const points: Point[] = []
    
    this.data.nodes.forEach((node, i) => {
      if(this.activations[i]() === 1 || i === index) {
        points.push({ x: node.x, y: node.y })
      }
    })
    
    const nextBackgroundPoints_ = computeBackground(points)
    const backgroundPoints      = (this.background?.points() as any) || []
    const firstBackgroundPoints = backgroundPoints[0] as any
    const index_                = nextBackgroundPoints_.findIndex(point => firstBackgroundPoints && point.x === firstBackgroundPoints.x && point.y === firstBackgroundPoints.y)
    const nextBackgroundPoints  = rotateArray(nextBackgroundPoints_, index_)

    const convexHullPoints     = convexHull(points)
    const offsetedPoints       = offsetPoints(convexHullPoints, 600)
    const voronoiCells         = voronoiDiagram(offsetedPoints, points)

    const {result: resultLines, unionPoints} = interpolateShapes(backgroundPoints as Point[], nextBackgroundPoints)

    const paths = resultLines.map(line => new Line({ points: () => line, lineWidth: 5, stroke: 'red' }))
    const shape = new Line({ points: () => offsetedPoints, lineWidth: 5, stroke: 'blue', closed: true })
    voronoiCells.forEach(cell => {
      const shape = new Line({ points: () => cell, lineWidth: 5, stroke: 'green', closed: true })
      this.backgroundPaths.add(shape)
    })


    if(voronoiCells.length > 2) {

      const mergedCells = mergeCells(voronoiCells[0], voronoiCells[1])
      const shape2 = new Line({ points: () => mergedCells, lineWidth: 5, stroke: 'yellow', closed: true })
      this.backgroundPaths.add(shape2)
    }

    //this.backgroundPaths.add(shape)
    
    //this.backgroundPaths.add(paths)
    
    unionPoints?.forEach((point, i) => {
      const circle = new Circle({ x: point.x+15, y: point.y, size: 25, fill: 'black' })
      circle.add(new Txt({ text: i.toString(), fontSize: 20, fill: 'white' }))
      //this.backgroundPaths.add(circle)
    })

    nextBackgroundPoints?.forEach((point, i) => {
      const circle = new Circle({ x: point.x-15, y: point.y, size: 25, fill: 'magenta' })
      circle.add(new Txt({ text: i.toString(), fontSize: 20, fill: 'white' }))
      //this.backgroundPaths.add(circle)
    })

    return { prePoints: unionPoints, postPoints: nextBackgroundPoints}
  }

  // ----------------------------------------------- //

  private initializeBackground() {
    
    const points: Point[] = [this.data.nodes[0]]

    const hullPoints = computeBackground(points)

    const background = new Line({ points: () => hullPoints, fill: hsl(0, 80, 70), stroke: 'rgba(255,180,180,1)', lineWidth: 20, radius: 0, closed: true, zIndex: -1000, })

    this.background = background
    
    this.add(background)
  }

  private initializeNode(i: number) {
    const nodeData = this.data.nodes[i]
    const { x, y } = nodeData
    const activation = this.activations[i]
    const imageSize = 400

    const nodeWrapper = new Node({key: nodeData.id.toString()})

    // const background = new Circle({
    //   size: 640,
    //   fill: 'rgba(255,60,60,.4)',
    //   opacity: activation,
    //   zIndex: -1000,
    //   position: { x: x, y: y },
    //   scale: activation,
    //   filters: [blur(50)],
    // })
    // this.add(background)

    const size = 240
    const border = new Line({
      points: () => [
        { x: nodeData.x - (size + activation()*10)/2, y: nodeData.y -(size+activation()*10)/2 },
        { x: nodeData.x + (size + activation()*10)/2, y: nodeData.y - (size+activation()*10)/2 },
        { x: nodeData.x + (size + activation()*10)/2, y: nodeData.y + (size+activation()*10)/2 },
        { x: nodeData.x - (size + activation()*10)/2, y: nodeData.y + (size+activation()*10)/2 },
      ],
      closed: true,
      end: i === 0 ? 0 : 0,
      opacity: 0,
      stroke: hsl(0, 60, 83),
      lineWidth: 10,

      lineCap: "round",
      radius: nodeData.type === 'circle' ? size/2 : 15,
    })
    this.borders.push(border)

    const text = new Txt({
      text: nodeData.name,
      fontSize: 35,
      fill: 'white',
      fontFamily: 'Rubik',
      fontWeight: 400,
      position: { x: 0, y: nodeData.type === 'circle' ? 0+160 : 0+95 },
      opacity: 0,
    })

    const hue = 240
    const saturation = 20
    const lightness = 10
    
    const node = new Rect({
      width: () => size + activation()*10,
      height: () => size + activation()*10,
      fill: 'rgb(52,50,57)',
      position: { x: x, y: y },
      opacity: 0,
      radius: nodeData.type === 'circle' ? size/2 : 15,
      stroke: '#ffffff4d',
      shadowBlur: () => 50 * activation(),
      shadowColor: '#00000080',
      clip: true,
      shadowOffsetX: () => 20 * activation(),
      shadowOffsetY: () => 20 * activation(),
    })
    this.nodes.push(node)
    this.add(nodeWrapper)
    nodeWrapper.add(node)

    if (nodeData.image) {
      const image = new Img({
        src: `./images/${nodeData.image}`,
        width: 210,
        // height: 210,
        scale: () => 1 + activation()*.1/2,
        opacity: 0,
        position: { x: 0, y: 0 },
      })
      node.add(image)
      //nodeWrapper.add(image)
      node.add(text)
      this.images.push(image)
    } else {
      this.images.push(null)
    }
    nodeWrapper.add(border)

    if (nodeData.infos && nodeData.infos.length > 0) {
      const infosContainer = new Node({
        position: { x: x + size/2 + 80, y: y },
      })

      const dyInfo = 100
      nodeData.infos.forEach((info, index) => {
        const infoText = new Txt({
          text: info.name,
          fontSize: 30,
          fill: 'white',
          fontFamily: 'Rubik',
          fontWeight: 400,
          offset: [-1, 0],
          position: { x: 0, y: index * dyInfo - (nodeData.infos.length - 1) * dyInfo/2 },
          opacity: 1,
        })
        infosContainer.add(infoText)
      })

      nodeWrapper.add(infosContainer)
      this.infos.push(infosContainer)
    } else {
      this.infos.push(null)
    }
  }

  public *activate(index: number, duration: number) {
    const id = this.data.edges[index].id
    const edge = this.data.edges[index]
    const joints = edge.joints || []
    const points = edge.points || []
    const animations: any[] = []
    
    const child = edge.targetId
    const childIndex = this.data.nodes.findIndex(n => n.id === child)
    
    const startBorder = .0
    const dtBorder = 1
    const startNode = startBorder + dtBorder
    const dtNode = .5
    const startLiftUp = startNode + dtNode - .2
    const dtLiftUp = .5
    const dtEdge = startLiftUp +.3
    
    this.nodes[childIndex].opacity(1)

    // joints.forEach(j => {
    //   j.children?.forEach(child => {
    //     const targetId = typeof child === 'number' ? child : this.data.nodes.find(n => n.name === child)?.id
    //     const sourceId = j.id
    //     const edgeIndex = this.data.edges.findIndex(e => e.sourceId === sourceId && e.targetId === targetId)
    //     animations.push(delay(dtEdge*j.s,this.activate(edgeIndex, duration)))

    //   })
    // })

    yield* all(
      tween(dtEdge, value => { this.edges[index].end(value)}),
      this.edges[index]?.opacity(1, .01),
      delay(startBorder, tween(dtBorder, value => { this.borders[childIndex].end(value)})),
      delay(startBorder, tween(.01, value => { this.borders[childIndex].opacity(value)})),
      delay(startNode, tween(dtNode, value => { this.nodes[childIndex].fill(Color.lerp(new Color('rgb(52,50,57)'), new Color(hsl(0, 60, 38)), value))})),
      delay(startNode, tween(dtNode, value => { this.nodes[childIndex].children()[1]?.opacity(value)})),
      delay(startNode, tween(dtNode, value => { this.images[childIndex]?.opacity(value)})),
      // delay(startNode, this.infos[childIndex]?.opacity(1, dtNode)),
      delay(startLiftUp, this.activations[childIndex](1, dtLiftUp)),
      delay(startLiftUp, tween(dtLiftUp, value => { this.nodes[childIndex].children()[1]?.scale(1+value*.1)})),
      delay(startLiftUp, tween(dtLiftUp, value => { this.nodes[childIndex].children()[1]?.y(95+value*5)}))
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

  public *deactivate(index: number, duration: number) {
    const id = this.data.edges[index].id
    const edge = this.data.edges[index]
    const joints = edge.joints || []
    const points = edge.points || []
    const animations: any[] = []
    const child = edge.targetId
    const childIndex = this.data.nodes.findIndex(n => n.id === child)

    const startBorder = .0
    const dtBorder = 1
    const startNode = startBorder + dtBorder
    const dtNode = .5
    const startLiftDown = startNode + dtNode - .2
    const dtLiftDown = .5
    const dtEdge = startLiftDown + .3

    yield* all(
      tween(dtEdge, value => { this.edges[index].start(value)}),
      delay(dtEdge, this.edges[index].opacity(0, .01)),
      delay(startBorder, tween(dtBorder, value => { this.borders[childIndex].start(value)})),
      delay(startNode, tween(dtNode, value => { this.nodes[childIndex].fill(Color.lerp(new Color(hsl(0, 60, 38)), new Color('rgb(52,50,57)'), value))})),
      delay(startNode, tween(dtNode, value => { this.images[childIndex]?.opacity(1 - value)})),
      delay(startNode, this.infos[childIndex]?.opacity(0, dtNode)),
      delay(startLiftDown, this.activations[childIndex](0, dtLiftDown)),
      delay(startBorder+dtBorder, tween(.01, value => { this.borders[childIndex].opacity(1 - value)})),
    )

    this.nodes[childIndex].opacity(0)
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