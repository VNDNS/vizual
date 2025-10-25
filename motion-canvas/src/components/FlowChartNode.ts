import { Rect, Txt, Node, Img, Line } from "@motion-canvas/2d"
import { SimpleSignal, Color, all, delay, tween, createSignal } from "@motion-canvas/core"
import { NodeConfig } from "./NodeConfig"
import { FlowChart } from "./FlowChart"
import { getShadowProps } from "./functions/getShadowProps"
import { getSquarePoints } from "./functions/getSquarePoints"
import { getInfoLinePoints } from "./functions/getInfoLinePoints"
import { linear } from "./linear"
import { hsl } from "./hsl"

const lineColor = hsl(0, 60, 83)

export class FlowChartNode extends Node {
  
  public border: Line
  public background: Rect
  public image: Img | null = null
  public infos: Node | null = null

  private config: NodeConfig
  private activation: SimpleSignal<number, this> = createSignal(0)
  private size: () => number = () => 240 + this.activation()*10

  constructor(flowchart: FlowChart, config: NodeConfig) {
    super({ key: config.id.toString(), x: config.x, y: config.y })
    flowchart.add(this)
    
    this.config     = config

    this.initializeBackground()
    this.initializeBorder()
    this.initializeText()
    this.initializeImage()
    this.initializeInfos()
  }

  private initializeBackground() {
    const shadowProps = getShadowProps(this.activation)
    this.background = new Rect({ 
      width: this.size, 
      height: this.size, 
      fill: 'rgb(52,50,57)', 
      opacity: 0, 
      radius: this.config.type === 'circle' ? () => this.size()/2 : 15, 
      ...shadowProps 
    })
    this.add(this.background)
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
      radius: this.config.type === 'circle' ? () => this.size()/2 : 15 
    })
    this.add(this.border)
  }

  private initializeText() {
    const text = new Txt({ 
      text: this.config.name, 
      fontSize: 35, 
      fill: 'white', 
      fontFamily: 'Rubik', 
      fontWeight: 400, 
      position: { x: 0, y: this.config.type === 'circle' ? 160 : 95 }, 
      opacity: 1 
    })
    this.background.add(text)
  }

  private initializeImage() {
    if (!this.config.image) return
    
    this.image = new Img({ 
      src: `./images/${this.config.image}`, 
      width: 210, 
      scale: () => 1 + this.activation()*.1/2, 
      opacity: 0, 
    })

    this.background.add(this.image)
  }

  private initializeInfos() {
    if (!this.config.infos?.length) return
    
    this.config.infos.forEach((info, index) => {
      const dyInfo    = 100
      const infoTextX = 200
      const infoY     = index * dyInfo - (this.config.infos.length - 1) * dyInfo/2
      const infoTextY = infoY
      const position  = { x: infoTextX, y: infoTextY }
      const infoText  = new Txt({ text: info.name, fontSize: 30, fill: 'white', fontFamily: 'Rubik', offset: [-1, 0], position, opacity: 1 })
      const points    = getInfoLinePoints(this.size, infoText)
      const polyline  = new Line({ points, stroke: lineColor, lineWidth: 5, radius: 30, lineCap: "round" })
      
      this.add(polyline)
      this.add(infoText)
    })
  }

  public *fadeIn() {
    this.background.opacity(1)

    const startBorder = .0
    const dtBorder = 1
    const startNode = startBorder + dtBorder
    const dtNode = .5
    const startLiftUp = startNode + dtNode - .2
    const dtLiftUp = .5
    
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