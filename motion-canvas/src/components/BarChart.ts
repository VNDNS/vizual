import { initial, signal, Rect, Txt, Node, Img, NodeProps, Line } from "@motion-canvas/2d"
import { SimpleSignal, createSignal } from "@motion-canvas/core"
import { hsl } from "./DynamicBarChart"
import { debug } from '../../../debug'
import { AnimationClip } from "./types/AnimationClip"
import { sequence_ } from "./functions/sequence_"

interface BarChartData {
  name: string
  value: number
  logo?: string
}

interface BarChartProps extends NodeProps {
  data: BarChartData[]
  height: number
  title: string
  startMaxValue?: number
  barWidth?: number
  barGap?: number
  maxChartWidth?: number
  x?: number
  y?: number
}

export class BarChart extends Rect {



  @initial(80)
  @signal()
  public declare readonly barWidth: SimpleSignal<number, this>

  @initial(20)
  @signal()
  public declare readonly barGap: SimpleSignal<number, this>

  @initial(0)
  @signal()
  public declare readonly maxValue: SimpleSignal<number, this>

  private data: BarChartData[]
  private activations: SimpleSignal<number, this>[]
  private title: string
  private titleText: Txt
  private absoluteNode: Rect
  private barChartContainer: Rect
  private legendContainer: Rect
  private barChartNode: Rect



  public constructor(props: BarChartProps) {
    super({...props, layout: true, gap: 50})

    this.data = props.data
    // this.width(props.width)
    // this.height(props.height)
    this.absoluteNode = new Rect({layout: false})
    this.add(this.absoluteNode)
    this.x(props.x)
    this.y(props.y)
    this.title = props.title
    // const currentMaxValue = () => Math.max(...this.data.map((d, i) => d.value * this.activations[i]()))
    const currentMaxValue = () => Math.max(...this.data.map((d, i) => d.value))
    this.maxValue(() => Math.max(currentMaxValue(), props.startMaxValue ?? 0))
    
    if (props.barWidth) {
      this.barWidth(props.barWidth)
    }
    if (props.barGap) {
      this.barGap(props.barGap)
    }

    const legendContainer = new Rect({
      direction: 'column',
      gap: 10,
      justifyContent: 'start',
    })

    const n = this.data.length
    
    let width = n * this.barWidth() + (n - 1) * this.barGap()

    if (width > props.maxChartWidth) {
      const newBarWidth = (props.maxChartWidth - (n - 1) * this.barGap()) / n
      this.barWidth(newBarWidth)
      width = props.maxChartWidth
    }
    
    
    this.barChartContainer = new Rect({
      height: props.height,
      width: width,
    })

    this.barChartNode = new Rect({layout: false})

    this.legendContainer = legendContainer


    this.initializeActivations()
    this.initializeBars()
    this.initializeLegend()
    this.add(this.legendContainer)
    this.add(this.barChartContainer)
    this.barChartContainer.add(this.barChartNode)

    


  }

  private initializeActivations() {
    if (this.data) {
      this.activations = this.data.map(() => createSignal(0))
    } else {
      this.activations = []
    }
  }

  private initializeBars() {
    const maxValue = this.maxValue
    const barCount = this.data.length
    
    const totalContentWidth = barCount * this.barWidth() + (barCount - 1) * this.barGap()
    const startX = -totalContentWidth / 2 + this.barWidth() / 2

    const rect = new Rect({
      fill: 'red',
      width: totalContentWidth,
      height: this.height,
      position: { x: 0, y: 0 },
      opacity: .1
    })

    this.titleText = new Txt({
      text: this.title,
      fontSize: 32,
      fill: 'white',
      fontFamily: 'Rubik',
      opacity: 0,
      position: { x: 0, y: this.height() / 2 +60 },
    })

    debug && this.absoluteNode.add(rect)
    this.absoluteNode.add(this.titleText)


    for (let i = 0; i < barCount; i++) {
      this.initializeBar(i, maxValue, startX)
    }
  }

  private initializeBar(i: number, maxValue: any, startX: number) {
    const item = this.data[i]
    const activation2 = i < this.activations.length - 1 ? () => this.activations[i]() - this.activations[i+1]() : this.activations[i]
    const activation = this.activations[i]
    
    const barHeight = () => (item.value / maxValue()) * this.height() * activation()
    
    const xPos = startX + i * (this.barWidth() + this.barGap())
    
    const barColor = hsl(i, this.data.length)
    const textColor = hsl(i, this.data.length)
    
    const bar = new Rect({
      fill: barColor,
      width: () =>this.barWidth(),
      height: barHeight,
      position: () => ({ x: xPos, y: this.height() / 2 - barHeight() / 2 }),
      radius: 10,
    })



    const valueText = new Txt({
      text: () => (item.value * activation()).toFixed(),
      fontSize: 32,
      offset: [0,0],
      fontWeight: 700,
      fill: textColor,
      opacity: activation,
      position: () => ({ x: xPos, y: this.height() / 2 - barHeight() - 20 }),
    })

    const name = new Txt({
      text: item.name,
      fontSize: 0,
      fill: textColor,
      opacity: 1,//activation,
      offset: [1, 0],
      rotation: -30,
      position: { x: xPos, y: this.height() / 2 + 30 },
    })

    this.barChartNode.add(bar)
    this.barChartNode.add(valueText)

    if (item.logo) {
      const logoSrc = `/logos/${item.logo}.svg`
      const logoWidth = 220
      const logo = new Img({
        src: logoSrc,
        width: logoWidth,
        opacity: activation,
        position: { x: xPos, y: this.height() / 2 + 65 },
      })
      //this.add(logo)
    } else {
      this.absoluteNode.add(name)
    }
  }

  private initializeLegend() {
    for(let i = 0; i < this.data.length; i++) {
      this.createLegendItem(this.data[i], i)
    }
  }

  private createLegendItem(item: BarChartData, index: number) {
    const legendItem = new Rect({
      layout: true,
      direction: 'row',
      alignItems: 'center',
      gap: 10,
    })

    const colorIndicator = new Rect({
      width: 20,
      height: 20,
      fill: hsl(index, this.data.length),
      radius: 4
    })

    const legendText = new Txt({
      text: item.name,
      fontSize: 24,
      fontWeight: 400,
      fill: 'white'
    })

    legendItem.add(colorIndicator)
    legendItem.add(legendText)
    this.legendContainer.add(legendItem)
  }

  public *activate(index: number, duration: number) {
    yield* this.activations[index](1, duration)
  }

  public fadeIn(duration: number): AnimationClip {
    const animations: AnimationClip[] = []
    for(let i = 0; i < this.activations.length; i++) {
      animations.push({
        animation: this.activations[i](1, 1),
        duration: 1
      })
    }
    const titleClip: AnimationClip = {
      animation: this.titleText.opacity(1, 1),
      duration: 1
    }
    return sequence_(.2, [...animations, titleClip])
  }

  public *fadeOut(duration: number) {
    yield* this.opacity(0, duration)
    yield* this.titleText.opacity(0, duration)
  }

  public *deactivate(index: number, duration: number) {
    yield* this.activations[index](0, duration)
  }
} 