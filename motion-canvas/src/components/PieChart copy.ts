import { initial, signal, Line, Txt, Node, Img, NodeProps, Rect, RectProps } from "@motion-canvas/2d"
import { SimpleSignal, createSignal, delay, sequence } from "@motion-canvas/core"
import { hsl } from "./DynamicBarChart"
import { arcPoints } from "./functions/arcPoints"
import { polarToCartesian } from "./functions/polarToCartesian"
import { debug } from "../../../debug"

interface PieChartData {
  name: string
  value: number
  logo: string
}

interface PieChartProps extends RectProps {
  data: PieChartData[]
  diameter: number
  title: string
}

export class PieChart extends Rect {
  private static readonly DEFAULT_ANIMATION_DURATION = 1
  private static readonly LOGO_RADIUS_FACTOR = 0.3
  private static readonly VALUE_TEXT_RADIUS_FACTOR = 0.3
  private static readonly LOGO_WIDTH = 150
  private static readonly FONT_WEIGHT = 400
  private static readonly FONT_SIZE = 30
  private static readonly TITLE_POSITION_OFFSET = -15
  private static readonly LEGEND_ITEM_HEIGHT = 40
  private static readonly LEGEND_ITEM_SPACING = 10
  private static readonly LEGEND_COLOR_SIZE = 20
  private static readonly LEGEND_FONT_SIZE = 24

  @initial(100)
  @signal()
  public declare readonly diameter: SimpleSignal<number, this>

  private data: PieChartData[]
  private activations: SimpleSignal<number, this>[]
  private angles: (() => number)[] = []
  private sumActivations: () => number
  private currentActivatedValue: number = 1
  private containerRect: Rect
  private centerNode: Rect
  private legendContainer: Rect
  private title: string
  private containerA: Rect
  private totalValue: number

  public constructor(props: PieChartProps) {
    super({...props, layout: true, gap: 50, opacity: 1})

    const debugProps = debug ? {lineWidth: 1, stroke: 'lime'} : {}
    this.containerRect = new Rect({
      layout: true,
      ...debugProps
    })

    this.containerA = new Rect({layout: true, height: props.diameter, width: props.diameter})

    this.centerNode = new Rect({layout: false, })
    
    
    
    this.legendContainer = new Rect({
      direction: 'column',
      justifyContent: 'start',
      gap: PieChart.LEGEND_ITEM_SPACING,
      position: [0, props.diameter / 2 + 50]
    })


    
    
    this.containerA.add(this.centerNode)
    this.containerRect.add(this.containerA)

    this.add(this.legendContainer)
    this.add(this.containerRect)

    this.title = props.title
    this.totalValue = props.data.reduce((acc, curr) => acc + curr.value, 0)
    this.data = [{name: 'placeholder', value: this.totalValue, logo: ''}, ...props.data]
    this.diameter(props.diameter)
    this.initializeActivations()
    this.initializeAngles()
    this.initializePies()
    this.initializeLegend()

    const a = new Rect({layout: false})

    const titleText = new Txt({
      fontSize: PieChart.FONT_SIZE,
      fontFamily: 'Rubik',
      layout: false,
      fontWeight: PieChart.FONT_WEIGHT,
      fill: 'white',
      position: [0, -props.diameter/2- 30],
      offset: [0, 1],
      text: this.title
    })
    const totalValueText = new Txt({
      fontFamily: 'Rubik',
      layout: false,
      fontWeight: PieChart.FONT_WEIGHT,
      fill: 'white',
      position: [-100, props.diameter/2+ 20],
      fontSize: PieChart.LEGEND_FONT_SIZE,
      offset: [1, -1],
      text: `Total: ${this.totalValue.toFixed()}`
    })
    a.add(titleText)
    a.add(totalValueText)
    this.add(a)
  }

  private initializeActivations() {
    this.activations = this.data.map(() => createSignal(0))
    this.activations[0](1)
    console.log(this.activations.map(activation => activation()))
  }

  private initializeAngles() {
    const values = this.data.map((item, i) => (() => item.value * this.activations[i]()))
    this.sumActivations = () => this.activations.reduce((acc, curr) => acc + curr(), 0)
    const totalActivated = () => values.reduce((acc, curr) => acc + curr(), 0)
    const cumulatedValues = [() => this.totalValue]

    // values.forEach((value, i) => {
    //   const previous = cumulatedValues[i]
    //   cumulatedValues.push(() => previous() + value())
    // })

    for(let i = 1; i < this.data.length; i++) {
      const previous = cumulatedValues[i-1]
      cumulatedValues.push(() => previous() + this.data[i].value)
    }

    console.log(cumulatedValues.map(value => value()))

    // const total = () => this.sumActivations() < 1 ? this.currentActivatedValue : totalActivated()
    const total = () => totalActivated()
    console.log(total())
    this.angles = cumulatedValues.map(value => () => value() / total() * 360)
    console.log(this.angles.map(angle => angle()))
  }

  private initializePies() {
    for (let i = 1; i < this.angles.length; i++) {
      this.initializePie(i)
    }
  }

  private initializeLegend() {
    for(let i = 0; i < this.data.length; i++) {
      this.createLegendItem(this.data[i], i)
    }
  }

  private createLegendItem(item: PieChartData, index: number) {
    const legendItem = new Rect({
      layout: true,
      direction: 'row',
      alignItems: 'center',
      gap: 10,
    })

    const colorIndicator = new Rect({
      width: PieChart.LEGEND_COLOR_SIZE,
      height: PieChart.LEGEND_COLOR_SIZE,
      fill: hsl(index, this.data.length),
      radius: 4
    })

    const legendText = new Txt({
      text: item.name,
      fontSize: PieChart.LEGEND_FONT_SIZE,
      fontWeight: PieChart.FONT_WEIGHT,
      fill: 'white'
    })

    legendItem.add(colorIndicator)
    legendItem.add(legendText)
    this.legendContainer.add(legendItem)
  }

  private initializePie(i: number) {
    const activation = this.activations[i-1]
    const startAngle = this.angles[i - 1]
    const endAngle = this.angles[i]
    const midAngle = () => (startAngle() + endAngle()) / 2

    const logoRadius = this.diameter() * PieChart.LOGO_RADIUS_FACTOR
    const valueTextRadius = this.diameter() * PieChart.VALUE_TEXT_RADIUS_FACTOR
    const logoPosition = () => polarToCartesian(logoRadius, midAngle())
    const valueTextPosition = () => polarToCartesian(valueTextRadius, midAngle())

    const points = () => arcPoints(this.diameter() / 2, startAngle(), endAngle())
    const textColor = hsl(i, this.data.length)
    const pieColor = hsl(i, this.data.length)
    const logoSrc = `/logos/${this.data[i-1].logo}.svg`

    const text = () => (this.data[i-1].value * activation()).toFixed()
    const title = () => this.title

    const pie = new Line({ points, fill: pieColor, closed: true })
    
    const valueText = new Txt({
      fontSize: PieChart.FONT_SIZE,
      opacity: activation,
      fontWeight: PieChart.FONT_WEIGHT,
      fill: textColor,
      position: valueTextPosition,
      text
    })
    const logo = new Img({
      src: logoSrc,
      width: PieChart.LOGO_WIDTH,
      position: logoPosition,
      opacity: activation
    })


    this.centerNode.add(pie)
    //this.add(titleText)
  }

  public *activate(index: number) {
    this.currentActivatedValue = this.data[index].value
    yield* this.activations[index](1, PieChart.DEFAULT_ANIMATION_DURATION)
  }

  public *fadeIn(duration: number) {
    const animations = []
    for(let i = 1; i < this.activations.length; i++) {
      animations.push(this.activate(i))
    }
    yield* delay(1, sequence(.3,  this.activations[0](0, .3),...animations))
    console.log(this.activations.map(activation => activation()))
  }

  public *fadeOut(duration: number) {
    yield* this.containerRect.opacity(0, duration)
  }
  
  public *deactivate(index: number) {
    this.currentActivatedValue = this.data[index].value
    yield* this.activations[index](0, PieChart.DEFAULT_ANIMATION_DURATION)
  }
}