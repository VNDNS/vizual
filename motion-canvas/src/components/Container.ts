import { Img, initial, Line, Node, NodeProps, Rect, RectProps, signal, Txt } from "@motion-canvas/2d"
import { all, Color, createSignal, delay, sequence, SimpleSignal, tween } from "@motion-canvas/core"
import { hsl } from "./FlowChart";

export interface ContainerProps extends NodeProps {
  data: any
  edge: any
}

export class Container extends Node {

  @initial(1)
  @signal()
  private declare readonly activation: SimpleSignal<number, any>;

  private border: Line
  private props: ContainerProps
  private items: Rect[]
  private container: Rect
  private edge: Line
  public constructor(props: ContainerProps){
    const width_ = 4*60*props.data.rows + (props.data.rows-1)*60+120
    const comlumns = Math.ceil(props.data.items.length / props.data.rows)
    const height_ = 4*60*comlumns + (comlumns-1)*60+120
    const activation = createSignal(0)
    super({})
    
    this.container = new Rect({...props, opacity: 1, fill: 'rgb(52,50,57)', 
      lineWidth: 10,
      shadowBlur: () => 50 * activation(),
      shadowColor: '#00000080',
      shadowOffsetX: () => 20 * activation(),
      scale: () => 1+activation()*.05,
      shadowOffsetY: () => 20 * activation(), 
      width: () =>width_+0*activation()*20, radius: 20, height: () => height_+0*activation()*20}
    )
    this.add(this.container)
    
    
      this.activation = activation
    this.props = props
    this.items = []
    const positions = props.data.items.map((item: any, index: number) => ({
      x: -width_/2  + (index % props.data.rows) * 300 + 150+30,
      y: -height_/2  + Math.floor(index / props.data.rows) * 300 + 150+30
    }))

    positions.forEach((position: any, index: number) => 
    {
      const rect = new Rect({...position,opacity: 0, fill:hsl(240, 30, 40), stroke: 'white', lineWidth: 5, radius: 10, width: 4*60, height: 4*60, rx: 10, ry: 10})
      this.container.add(rect)
      this.items.push(rect)
      const item = props.data.items[index]
      const text = new Txt({
        text: item.name,
        fontSize: 35,
        fill: 'white',
        fontFamily: 'Rubik',
        fontWeight: 400,
        position: { x: 0, y: 0+95 },
        opacity: 1,
      })
      rect.add(text)
      if (item.image) {
        const image = new Img({
          src: `./images/${item.image}`,
          width: 210,
          opacity: 1,
          position: { x: 0, y: 0 },
        })
        rect.add(image)
        rect.add(text)
      } else {
        rect.add(text)
      }
    })

    const border = new Line({
      points: () => [
        { x: -width_/2 - 0*this.activation()*10, y: -height_/2- 0*this.activation()*10 },
        { x: width_/2 + 0*this.activation()*10, y: -height_/2- 0*this.activation()*10 },
        { x: width_/2 + 0*this.activation()*10, y: height_/2+ 0*this.activation()*10 },
        { x: -width_/2 - 0*this.activation()*10, y: height_/2+ 0*this.activation()*10 },
      ],
      closed: true,
      end: 0,
      opacity: 0,
      stroke: hsl(240, 60, 83),
      lineWidth: 10,
      lineCap: "round",
      radius: 20,

    })
    this.border = border
    this.container.add(border)
    this.initializeEdge()
  }

  private initializeEdge() {
    const edgeData = this.props.edge
    const { points } = edgeData


    const edge = new Line({
      points: () => points,
      stroke: hsl(0,60,83),
      lineWidth: 10,
      lineCap: "round",
      radius: 50,
      zIndex: 1000,
      opacity: 0,
      end: 0,
    })
    this.add(edge)
    this.edge = edge
  }

  public *fadeIn(duration: number) {

    const nodeFadeIns = []

    for(let i = 0; i < this.props.data.items.length; i++) {
      nodeFadeIns.push(this.fadeInItem(i, 1))
    }

    yield* all(
      tween(1, value => { this.edge.end(value)}),
      this.edge.opacity(1, .1),
      delay(0, tween(1, value => { this.border.end(value)})),
      this.border.opacity(1, .1),
      delay(1, this.activation(1, 1)),
      delay(1, tween(1, value => { this.container.fill(Color.lerp(new Color('rgb(52,50,57)'), new Color(hsl(240, 20, 40)), value))})),
      delay(1, sequence(.1, ...nodeFadeIns))
    )
  }

  public *fadeInItem(index: number, duration: number) {
    yield* this.items[index].opacity(1, duration)
  }

  public *fadeOut(duration: number) {
    yield* this.opacity(0, duration)
  }
}