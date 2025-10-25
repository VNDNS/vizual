import { Rect, Txt, Node, Img, Line } from "@motion-canvas/2d"
import { SimpleSignal, Color, all, delay, tween } from "@motion-canvas/core"
import { textColor } from "../../../frontend/plugins/animation/constants"

const hsl = (color: number, saturation: number = 60, lightness: number = 60) => {
  return `hsl(${color}, ${saturation}%, ${lightness}%)`
}

const lineColor = hsl(0, 60, 83)

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

const getShadowProps = (activation: () => number) => {
  return { shadowBlur: () => 50 * activation(), shadowColor: '#00000080', clip: true, shadowOffsetX: () => 20 * activation(), shadowOffsetY: () => 20 * activation() }
}

const getSquarePoints = (size: () => number) => {
  return [
    { x:  - (size())/2, y:  - (size())/2 },
    { x:  + (size())/2, y:  - (size())/2 },
    { x:  + (size())/2, y:  + (size())/2 },
    { x:  - (size())/2, y:  + (size())/2 },
  ]
}

const getInfoLinePoints = (size: () => number, infoText: Txt) => {
          
  const lineOffsetY = 20
  const position = infoText.position()
  const lineY = position.y + lineOffsetY
  const dx = position.x
  const dy = lineY
  const angle = Math.atan2(dy, dx)
  
  const circleRadius = () => size() / 2
  const startX = () => circleRadius() * Math.cos(angle)
  const startY = () => circleRadius() * Math.sin(angle)

  const textWidth = infoText.width()
  const points = [
    { x: startX(), y: startY() },
    { x: position.x, y: lineY },
    { x: position.x + textWidth, y: lineY }
  ]
  return points
}

export class FlowChartNode {
  
  public border: Line
  public background: Rect
  public image: Img | null
  public infos: Node | null

  private parent: Node
  private nodeData: Nodes
  private activation: SimpleSignal<number, any>
  private node: Node
  private size: () => number

  constructor( parent: Node, nodeData: Nodes, activation: SimpleSignal<number, any> ) {
    this.parent = parent
    this.nodeData = nodeData
    this.activation = activation
    this.size = () => 240 + activation()*10

    this.initializeNode()
    this.initializeBackground()
    this.initializeBorder()
    this.initializeText()
    this.initializeImage()
    this.initializeInfos()
  }

  private initializeNode() {
    const { x, y } = this.nodeData
    this.node = new Node({ x, y, key: this.nodeData.id.toString() })
    this.parent.add(this.node)
  }

  private initializeBackground() {
    const shadowProps = getShadowProps(this.activation)
    this.background = new Rect({ 
      width: this.size, 
      height: this.size, 
      fill: 'rgb(52,50,57)', 
      opacity: 0, 
      radius: this.nodeData.type === 'circle' ? () => this.size()/2 : 15, 
      ...shadowProps 
    })
    this.node.add(this.background)
  }

  private initializeBorder() {
    const points = getSquarePoints(this.size)
    this.border = new Line({ 
      points, 
      closed: true, 
      end: 0, 
      opacity: 0, 
      stroke: lineColor, 
      lineWidth: 7, 
      lineCap: "round", 
      radius: this.nodeData.type === 'circle' ? () => this.size()/2 : 15 
    })
    this.node.add(this.border)
  }

  private initializeText() {
    const text = new Txt({ 
      text: this.nodeData.name, 
      fontSize: 35, 
      fill: 'white', 
      fontFamily: 'Rubik', 
      fontWeight: 400, 
      position: { x: 0, y: this.nodeData.type === 'circle' ? 160 : 95 }, 
      opacity: 1 
    })
    this.background.add(text)
  }

  private initializeImage() {
    if (this.nodeData.image) {
      this.image = new Img({ 
        src: `./images/${this.nodeData.image}`, 
        width: 210, 
        scale: () => 1 + this.activation()*.1/2, 
        opacity: 0, 
        position: { x: 0, y: 0 } 
      })
      this.background.add(this.image)
    } else {
      this.image = null
    }
  }

  private initializeInfos() {
    if (this.nodeData.infos?.length > 0) {
      const infosContainer = new Node({ x: 200, y: 0 })
      const dyInfo = 100

      this.nodeData.infos.forEach((info, index) => {
        const infoY = index * dyInfo - (this.nodeData.infos.length - 1) * dyInfo/2
        const infoTextX = 200
        const infoTextY = infoY
        const position = { x: infoTextX, y: infoTextY }
        const infoText = new Txt({ text: info.name, fontSize: 30, fill: 'white', fontFamily: 'Rubik', offset: [-1, 0], position, opacity: 1 })
        const points = getInfoLinePoints(this.size, infoText)
        const polyline = new Line({ points, stroke: lineColor, lineWidth: 5, radius: 30, lineCap: "round" })
        
        this.node.add(polyline)
        this.node.add(infoText)
      })

      this.node.add(infosContainer)
      this.infos = infosContainer
    } else {
      this.infos = null
    }
  }

  public *fadeIn() {
    this.background.opacity(1)

    const startBorder = .0
    const dtBorder = 1
    const startNode = startBorder + dtBorder
    const dtNode = .5
    const startLiftUp = startNode + dtNode - .2
    const dtLiftUp = .5
    const dtEdge = startLiftUp +.3
    
    yield* all(
      linear(startBorder, dtBorder, this.border.end),
      linear(startBorder, .01, this.border.opacity),
      delay(startNode, tween(dtNode, value => { this.background.fill(Color.lerp(new Color('rgb(52,50,57)'), new Color(hsl(0, 60, 38)), value))})),
      delay(startNode, tween(dtNode, value => { this.background.children()[1]?.opacity(value)})),
      delay(startNode, tween(dtNode, value => { this.image?.opacity(value)})),
      delay(startLiftUp, this.activation(1, dtLiftUp)),
      delay(startLiftUp, tween(dtLiftUp, value => { this.background.children()[1]?.scale(1+value*.1)})),
      delay(startLiftUp, tween(dtLiftUp, value => { this.background.children()[1]?.y(95+value*5)}))
    )
  }
}

const linear = (t0: number, dt: number, f: (value: number) => void) => {
  return delay(t0, tween(dt, value => { f(value)}))
}