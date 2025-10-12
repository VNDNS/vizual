import { Img, initial, Node, NodeProps, Rect, signal, Txt } from "@motion-canvas/2d"
import { delay, sequence, SimpleSignal, createSignal, all } from "@motion-canvas/core"
import { lineColor, nodeColor } from "../frontend/plugins/animation/constants"
import { PieChart } from "../motion-canvas/src/components/PieChart";
import { BarChart } from "../motion-canvas/src/components/BarChart";
import { Video } from "../motion-canvas/src/components/Video";
import { Image } from "../motion-canvas/src/components/Image";
import { LinePlot } from "../motion-canvas/src/components/LinePlot";
import { KeyValueTable } from "../motion-canvas/src/components/KeyValueTable";
import { number } from "zod";

const linePlotMap: Record<1 | 2 | 3 | 4, any> = {
  1: { width: 800, height: 600 },
  2: { width: 700, height: 400 },
  3: { width: 800, height: 400 },
  4: { width: 100, height: 75 },
}

const keyValueTableMap: Record<1 | 2 | 3 | 4,any> = {
  1: { gapX: 60, gapY: 60, columns: 2 },
  2: { gapX: 30, gapY: 90, columns: 3 },
  3: { gapX: 15, gapY: 15, columns: 2 },
  4: { gapX: 7.5, gapY: 7.5, columns: 2 },
}

const pieChartMap: Record<1 | 2 | 3 | 4, any> = {
  1: { size5: 300, dx: -400, dy: -80, padding: 100 },
  2: { size5: 300 },
  3: { size5: 330 },
  4: { size5: 300 },
}

const videoChartMap: Record<1 | 2 | 3 | 4, any> = {
  1: { width: 1700, dx: 0, dy: 0, padding: 0 },
  2: { size5: 300 },
  3: { size5: 330 },
  4: { size5: 300 },
}

export interface PanelProps extends NodeProps {
  data: any[][]
}

export class Panel extends Node {

  @initial(1)
  @signal()
  private declare readonly activation: SimpleSignal<number, this>;

  private data: any[]
  private components: any[]
  private dataIndex: number
  private layout: any[]
  private panel: Rect
  private dx: SimpleSignal<number, this>
  private dy: SimpleSignal<number, this>

  public constructor(props: PanelProps){
    super({...props})

    this.layout = []
    this.dataIndex = 0
    this.data = props.data
    this.components = []
    this.dx = createSignal(0)
    this.dy = createSignal(0)
    this.initializePanel()
    this.initializeComponents()
    this.activation(0)
  }

  private initializePanel(){
    const panel = new Rect({
      // x: () => -1920 + (1920/2 + 27) * this.activation() - 35,
      x: () => (1 - this.activation()) * (-990) + this.activation()*this.dx(),
      y: this.dy,
      offsetX: () => 1 - this.activation(),
      fill: nodeColor,
      layout: true,
      alignItems: 'center',
      gap: 30,
      stroke: lineColor,
      lineWidth: 15,
      clip: true,
      direction: 'row',
      radius: 40,
      padding: 7,
      opacity: 1,
      shadowBlur: () => 90 * this.activation(),
      shadowColor: '#00000080',
      shadowOffsetX: () => 20 * this.activation(),
      shadowOffsetY: () => 20 * this.activation(),
    })
    this.panel = panel
    this.add(this.panel)
  }

  private initializeComponents(){

    this.panel.removeChildren()

    const data = this.data[this.dataIndex]
    const numberOfComponents: number = data.length
    const dx = 230
    const dy = 260


    if(numberOfComponents === 1) {
      this.layout = [{x: 0, y: 0}]
    }
    if(numberOfComponents === 2) {
      this.layout = [{x: 0, y: -dy}, {x: 0, y: dy}]
    }
    if(numberOfComponents === 3) {
      this.layout = [{x: -dx, y: -dy}, {x: dx, y: -dy}, {x: 0, y: dy}]
    }
    if(numberOfComponents === 4) {
      this.layout = [{x: -dx, y: -dy}, {x: dx, y: -dy}, {x: -dx, y: dy}, {x: dx, y: dy}]
    }

    data.forEach((component: any, i: number) => {
      
      let newComponent: any
      
      if(component.type === 'pieChart') {
        const dimensions = pieChartMap[numberOfComponents as keyof typeof pieChartMap]
        this.dx(dimensions.dx)
        this.dy(dimensions.dy)
        newComponent = new PieChart({data: component.data, position: this.layout[i], title: component.title, ...dimensions})
      }
      if(component.type === 'barChart') {
        newComponent = new BarChart({data: component.data, width: 200, height: 200,  position: this.layout[i], title: component.title})
      }
      if(component.type === 'video') {
        const dimensions = videoChartMap[numberOfComponents as keyof typeof videoChartMap]
        this.dx(dimensions.dx)
        this.dy(dimensions.dy)
        this.panel.padding(dimensions.padding)
        newComponent = new Video({src: component.data, position: this.layout[i], title: component.title, width: dimensions.width, radius: 35})
      }
      if(component.type === 'image') {
        newComponent = new Image({src: component.data, position: this.layout[i], title: component.title, width: 900, radius: 10, stroke: lineColor, lineWidth: 10})
      }
      if(component.type === 'linePlot') {
        const dimensions = linePlotMap[numberOfComponents as keyof typeof linePlotMap]
        newComponent = new LinePlot({data: component.data, position: this.layout[i], title: component.title, ...dimensions})
      }
      if(component.type === 'keyValueTable') {
        const dimensions = keyValueTableMap[numberOfComponents as keyof typeof keyValueTableMap]
        newComponent = new KeyValueTable({data: component.data, position: this.layout[i], columns: 2, ...dimensions})
      }

      this.components.push(newComponent)
      this.panel.add(newComponent)
    })
  }

  public *fadeIn(duration: number){
    const animations = []
    for(let i = 0; i < this.components.length; i++){
      animations.push(delay(.2, this.components[i].fadeIn(duration)))
    }
    yield* sequence(.0, delay(.5, this.activation(1, duration)), ...animations)
  }

  public *next(duration: number){
    const animations = []
    for(let i = 0; i < this.components.length; i++){
      animations.push(this.components[i].fadeOut(duration))
    }
    sequence(.2, ...animations),
    yield* this.fadeOut(duration)
    this.dataIndex++
    this.initializeComponents()
    yield* this.fadeIn(.4)
  }

  public *fadeOut(duration: number){
    yield* this.activation(0, duration)
  }
}