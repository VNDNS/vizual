import { Rect, initial, signal, Line, Txt } from "@motion-canvas/2d"
import { SimpleSignal, Vector2, PossibleVector2 } from "@motion-canvas/core"
import { numberToDate } from "../../../server/functions/numberToDate"

const colors = ['coral', 'cornflowerblue', 'darkseagreen', 'darkorchid', 'darkred', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkred', 'darkseagreen', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue', 'firebrick', 'forestgreen', 'fuchsia', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'hotpink', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen']

export const hsl = (index: number, n: number, saturation: number = 60, lightness: number = 60) => {
  return `hsl(${index*360/n}, ${saturation}%, ${lightness}%)`
}

interface DynamicBarChartProps {
  data: any
  xMin: number
  xMax: number
  width: number
  height: number
  barHeight: number
  t: SimpleSignal<number>
  x?: number
  y?: number
  bars: number
}

export class DynamicBarChart extends Rect {
  @initial(0)
  @signal()
  public declare readonly xMin: SimpleSignal<number, this>

  @initial(100)
  @signal()
  public declare readonly xMax: SimpleSignal<number, this>

  @initial(true)
  @signal()
  public declare readonly showAxes: SimpleSignal<boolean, this>

  public declare readonly data: any
  public declare readonly bars: number

  @initial(30)
  @signal()
  public declare readonly barHeight: SimpleSignal<number, this>

  @initial(0)
  @signal()
  public declare readonly t: SimpleSignal<number>

  public constructor(props: DynamicBarChartProps) {
    super({
      width: props.width,
      height: props.height,
      x: props.x,
      y: props.y,
    })

    this.xMin(props.xMin)
    this.xMax(props.xMax)
    this.barHeight(props.barHeight)
    this.data = props.data
    this.t = props.t
    this.bars = props.bars
    this.initializeBars()
    this.initializeTimeDisplay()
  }

  public mapToLocal(x: number): number {
    const rangeX = this.xMax() - this.xMin()
    const width = this.width()
    const offset = this.offset()
    const proportionX = rangeX === 0 ? 0.5 : (x - this.xMin()) / rangeX
    const pixelX_from_topleft = proportionX * width
    const originX_from_topleft = width * (offset.x * 0.5 + 0.5)
    const localX = pixelX_from_topleft - originX_from_topleft

    return localX
  }

  public mapFromLocal(localPoint: number): number {
    const rangeX = this.xMax() - this.xMin()
    const width = this.width()
    const offset = this.offset()

    const originX_from_topleft = width * (offset.x * 0.5 + 0.5)
    const pixelX_from_topleft = localPoint + originX_from_topleft
    const proportionX = width === 0 ? 0.5 : pixelX_from_topleft / width
    const internalX = this.xMin() + proportionX * rangeX

    return internalX
  }

  private initializeAxes() {

    const xAxisPoints = () => {
      const startX = this.mapToLocal(this.xMin())
      const startY = -this.height()/2
      const endX = this.mapToLocal(this.xMax())
      const endY = -this.height()/2
      return [{x: startX, y: startY}, {x: endX, y: endY}]
    }

    const yAxisPoints = () => {

      const startX = this.mapToLocal(0)
      const startY = -this.height()/2
      const endX = this.mapToLocal(0)
      const endY = this.height()/2
      return [{x: startX, y: startY}, {x: endX, y: endY}]
    }

    const xAxis = new Line({
      points: xAxisPoints,
      stroke: 'white',
      lineWidth: 2,
      lineCap: 'round',
      opacity: () => (this.showAxes() ? 1 : 0),
    })

    const yAxis = new Line({
      points: yAxisPoints,
      stroke: 'white',
      lineWidth: 2,
      lineCap: 'round',
      opacity: () => (this.showAxes() ? 1 : 0),
    })

    this.add(xAxis)
    this.add(yAxis)
  }

  private initializeBar(data: any, name: string, index: number) {
    
    const order = () => data.order[this.t()]
    const opacity = () => Math.max(0, Math.min(1, this.bars - order() - 1))

    const nameText = new Txt({
      text: name,
      fontSize: 32,
      fill: 'white',
      offset: [1, 0],
      x: this.mapToLocal(0)-20,
      y:  () => order() * (this.barHeight() + 10) + .5*(this.barHeight()+10) - this.height()/2,
      opacity: opacity,
    })

    const maxValue = () => this.data.maxValues[this.t()]
    const width_ = () => data.interpolated[this.t()] / maxValue() * 140
    const width = () => this.mapToLocal(width_() || data.interpolated.at(-1)) - this.mapToLocal(0)
    
    const valueText = new Txt({
      text: () => (data.interpolated[this.t()] || data.interpolated.at(-1)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      fontSize: 45,
      fill: hsl(index, Object.keys(this.data.data).length, 100, 20),
      fontWeight: 700,
      offset: [1, 0],
      x: () => width()-320,
      y: () => order() * (this.barHeight() + 10) + .5*(this.barHeight()+10) - this.height()/2,
      opacity: opacity,
    })


    const bar = new Rect({
      width,
      x: this.mapToLocal(0),
      y: () => order() * (this.barHeight() + 10) + .5*(this.barHeight()+10) - this.height()/2,
      height: this.barHeight(),
      fill: hsl(index, Object.keys(this.data.data).length),
      offset: [-1, 0],
      radius: 10,
      opacity: opacity,
    })
    this.add(nameText)
    this.add(bar)
    this.add(valueText)
  }

  private initializeBars() {
    for(let i = 0; i < Object.keys(this.data.data).length; i++) {
      const key = Object.keys(this.data.data)[i]
      this.initializeBar(this.data.data[key], key, i)
    }
  }

  private initializeTimeDisplay() {
    const firstDate = this.data.firstDate
    const lastDate = this.data.lastDate
    const frames = (Object.values(this.data.data)[0] as any).interpolated.length
    const timeText = new Txt({
      text: () => numberToDate(firstDate + (this.t() / (frames - 1)) * (lastDate - firstDate)),
      fontSize: 80,
      fill: 'white',
      x: () => 550,
      y: () => 900,
      offset: [1, 0],
    })
    this.add(timeText)
  }
}