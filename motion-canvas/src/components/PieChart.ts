import { initial, signal, Line, Txt, Node, Img, NodeProps, Rect, RectProps } from "@motion-canvas/2d"
import { SimpleSignal, all, createSignal, delay, sequence } from "@motion-canvas/core"
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

  private activations: SimpleSignal<number, this>[]
  private totalValue: number
  private data: PieChartData[]
  private legendContainer: Rect
  private diameter: number

  constructor(props: PieChartProps) {
    super({...props, gap: 0 })

    this.activations = props.data.map(() => createSignal(0))
    this.totalValue = props.data.reduce((acc, curr) => acc + curr.value, 0)
    this.data = props.data
    this.diameter = props.diameter
    const cumulatedValues = [props.data[0].value]
    for(let i = 1; i < props.data.length; i++) {
      const item = props.data[i].value
      cumulatedValues.push(cumulatedValues[i-1] + item)
    }

    const pieChartContainer = new Rect({
      width: props.diameter,
      height: props.diameter,
    })

    const absoluteNode = new Rect({layout: false})
    this.add(absoluteNode)
    
    const titleText = new Txt({
      text: props.title,
      fontSize: 32,
      fontWeight: 400,
      fontFamily: 'Rubik',
      fill: 'white',
      position: [0, -props.diameter/2-40],
    })

    const totalValueText = new Txt({
      text: `Total: ${this.totalValue.toFixed()}`,
      fontSize: 24,
      fontWeight: 400,
      fill: 'white',
      offsetX: 1,
      position: [-100, props.diameter/2+20],
    })
    absoluteNode.add(titleText)
    absoluteNode.add(totalValueText)
    
    const legendContainer = new Rect({
      direction: 'column',
      gap: 10,
      justifyContent: 'start',
      height: props.diameter,
      opacity: 1,
    })
    
    const pieChartNode = new Rect({layout: false})

    for(let i = 0; i < props.data.length; i++) {
      const item = props.data[i]
      const start = i > 0 ? () => this.activations[i-1]() * cumulatedValues[i-1]/ this.totalValue * 360 : () => 0
      const startAngle = start
      const endAngle = () => this.activations[i]() * cumulatedValues[i]/this.totalValue * 360
      const midAngle = () => (startAngle() + endAngle()) / 2
      const points = () => arcPoints(props.diameter / 2, start(), this.activations[i]() * cumulatedValues[i]/this.totalValue * 360)
      
      const pie = new Line({
        points,
        fill: hsl(i, props.data.length),
        closed: true,
      })

      const valueTextPosition = () => polarToCartesian(this.diameter/2 * .6, midAngle())

      const valueText = new Txt({
        text: () => (item.value * this.activations[i]() / this.totalValue*100).toFixed() + '%',
        fontSize: 40,
        fontWeight: 500,
        fontFamily: 'Rubik',
        fill: hsl(i, props.data.length, 50, 30),
        scale: this.activations[i],
        position: valueTextPosition,
      })
      pieChartNode.add(pie)
      pieChartNode.add(valueText)
    }

    this.add(legendContainer)
    this.add(pieChartContainer)
    pieChartContainer.add(pieChartNode)
    this.legendContainer = legendContainer
    this.initializeLegend()
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

  public *fadeIn(duration: number) {
    const animations = [] 
    for(let i = 0; i < this.activations.length; i++) {
      animations.push(this.activations[i](1, 1))
    }
    yield* delay(.2, all(
      ...animations
    ))
  }
}