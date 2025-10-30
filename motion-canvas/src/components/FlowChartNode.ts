import { Rect, Txt, Node, Img, Line } from "@motion-canvas/2d"
import { SimpleSignal, Color, all, delay, tween, createSignal, sequence } from "@motion-canvas/core"
import { NodeConfig } from "./types/NodeConfig"
import { FlowChart } from "./FlowChart"
import { getShadowProps } from "./functions/getShadowProps"
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
  private width: () => number = () => (this.config.width ?? 240) + this.activation()*10
  private height: () => number = () => (this.config.height ?? 240) + this.activation()*10
  private infoLines: Line[] = []
  private infoTexts: Txt[] = []
  private text: Txt

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

  public updateConfig(newConfig: NodeConfig) {
    this.config = newConfig
    if (this.text) {
      this.text.text(this.config.name)
    }
  }

  private initializeBackground() {
    const shadowProps = getShadowProps(this.activation)
    this.background = new Rect({ 
      width: this.width, 
      height: this.height, 
      fill: 'rgb(52,50,57)', 
      opacity: 0, 
      radius: this.config.type === 'circle' ? () => Math.min(this.width(), this.height())/2 : 15, 
      ...shadowProps 
    })
    this.add(this.background)
  }

  private initializeBorder() {
    const points = () => [
      { x: -this.width() / 2, y: -this.height() / 2 },
      { x: +this.width() / 2, y: -this.height() / 2 },
      { x: +this.width() / 2, y: +this.height() / 2 },
      { x: -this.width() / 2, y: +this.height() / 2 },
    ]
    this.border = new Line({ 
      points, 
      closed: true, 
      end: 0, 
      opacity: 0, 
      stroke: lineColor, 
      lineWidth: 7, 
      lineCap: "round", 
      radius: this.config.type === 'circle' ? () => Math.min(this.width(), this.height())/2-.001 : 15 
    })
    this.add(this.border)
  }

  private initializeText() {
    const baseSize = this.config.width ?? 240
    const getPosition = () => {
      if (this.config.type === 'text') {
        return { x: 0, y: 0 }
      } else if (this.config.type === 'circle') {
        return { x: 0, y: 160 }
      } else {
        return { x: 0, y: 90 * this.height()/baseSize }
      }
    }
    const text = new Txt({ 
      text: this.config.name, 
      fontSize: () => 32 * this.width()/baseSize, 
      fill: 'white', 
      fontFamily: 'Rubik', 
      fontWeight: 400, 
      position: getPosition,
      opacity: 0 
    })
    this.background.add(text)
    this.text = text
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
      const infoText  = new Txt({ text: info.name, fontSize: 30, fill: 'white', fontFamily: 'Rubik', offset: [-1, 0], position, opacity: 0 })
      const lineOffsetY = 20
      const lineY = position.y + lineOffsetY
      const dx = position.x
      const dy = lineY
      const angle = Math.atan2(dy, dx)
      
      const getStartPosition = () => {
        if (this.config.type === 'circle') {
          const getRadius = () => Math.min(this.width(), this.height()) / 2
          return {
            x: getRadius() * Math.cos(angle),
            y: getRadius() * Math.sin(angle)
          }
        } else {
          const halfWidth = this.width() / 2
          const halfHeight = this.height() / 2
          const absDx = Math.abs(dx)
          const absDy = Math.abs(dy)
          
          if (absDx > absDy) {
            const ratio = halfWidth / absDx
            return {
              x: dx > 0 ? halfWidth : -halfWidth,
              y: dy * ratio
            }
          } else {
            const ratio = halfHeight / absDy
            return {
              x: dx * ratio,
              y: dy > 0 ? halfHeight : -halfHeight
            }
          }
        }
      }
      
      const startX = () => getStartPosition().x
      const startY = () => getStartPosition().y
      const textWidth = infoText.width()
      const points = () => [
        { x: startX(), y: startY() },
        { x: position.x, y: lineY },
        { x: position.x + textWidth, y: lineY }
      ]
      const polyline  = new Line({ points, stroke: lineColor, lineWidth: 5, radius: 30, lineCap: "round", opacity: 0, end: 0 })
      
      this.add(polyline)
      this.add(infoText)
      
      this.infoLines.push(polyline)
      this.infoTexts.push(infoText)
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
    const startInfos = startLiftUp + dtLiftUp
    const dtInfos = .5
    
    const infoAnimations = this.infoLines.map((line, index) => {
      return all(
        linear(0, dtInfos, line.end),
        linear(0, .01, line.opacity),
        linear(0, dtInfos, this.infoTexts[index].opacity)
      )
    })
    
    yield* all(
      linear(startBorder, dtBorder, this.border.end),
      linear(startBorder, .01, this.border.opacity),
      delay(startNode, tween(dtNode, value => { this.background.fill(Color.lerp(new Color('rgb(52,50,57)'), new Color(hsl(0, 60, 38)), value))})),
      delay(startNode, tween(dtNode, value => { this.background.children()[1]?.opacity(value)})),
      delay(startNode, tween(dtNode, value => { this.image?.opacity(value)})),
      delay(startNode, tween(dtNode, value => { this.text.opacity(value)})),
      delay(startLiftUp, this.activation(1, dtLiftUp)),
      delay(startLiftUp, tween(dtLiftUp, value => { this.background.children()[1]?.scale(1+value*.1)})),
      delay(startLiftUp, tween(dtLiftUp, value => { this.background.children()[1]?.y(95+value*5)})),
      delay(startInfos, sequence(.2, ...infoAnimations))
    )
  }
}