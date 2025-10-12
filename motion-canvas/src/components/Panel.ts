import { Img, initial, Node, NodeProps, Rect, signal, Txt } from "@motion-canvas/2d"
import { delay, sequence, SimpleSignal, createSignal, all, waitFor } from "@motion-canvas/core"
import { lineColor, nodeColor } from "../../../frontend/plugins/animation/constants"
import { PieChart } from "./PieChart";
import { BarChart } from "./BarChart";
import { Video } from "./Video";
import { Image } from "./Image";
import { LinePlot } from "./LinePlot";
import { KeyValueTable } from "./KeyValueTable";
import { Text } from "./Text";

const componentConfigs: Record<string, any> = {
  'linePlot' : { width: 800, height: 600 , padding: 150, panelX: -300, panelY: 0},
  'pieChart' : { diameter: 500, panelX: -400, panelY: 0 , padding: 120},
  'barChart' : { height: 500, barGap: 20, panelX: -400, panelY: 0 , padding: 120, maxChartWidth: 900},
  'video' : { width: 1700, panelX: 0, panelY: 0 , padding: 0},
  'image' : { maxWidth: 1200, maxHeight: 850, offsetX: 0, padding: 0},
  'keyValueTable' : {panelX: -400, panelY: 0, padding: 70, columns: 3, gapX: 60, gapY: 60},
  'text' : {panelX: -400, panelY: 0, padding: 80, maxWidth: 600},
}


export interface PanelProps extends NodeProps {
  data: any[][]
}

export class Panel extends Node {

  @initial(1)
  @signal()
  private declare readonly activation: SimpleSignal<number, this>;

  private data: any[]
  private component: any
  private dataIndex: number
  private layout: any[]
  private panel: Rect
  private panel2: Rect
  private dx: SimpleSignal<number, this>
  private dy: SimpleSignal<number, this>

  @initial(1)
  @signal()
  private activation2: SimpleSignal<number, this>

  public constructor(props: PanelProps){
    super({...props})

    this.layout = []
    this.dataIndex = 0
    this.data = props.data
    this.component = null
    this.dx = createSignal(0)
    this.dy = createSignal(0)
    this.initializePanel()
    this.initializeComponent()
    this.activation(0)
    this.activation2(0)
  }

  private initializePanel(){
    const panel = new Rect({
      // x: () => -1920 + (1920/2 + 27) * this.activation() - 35,
      y: () =>  (1-this.activation()) * (-1080/2-30),
      x: this.dx,
      offsetY: () => 1-this.activation(),
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

    const panel2 = new Rect({
      y: () =>  this.activation2() * 570,
      offsetY: () => -this.activation2(),
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
      opacity: 0,
      shadowBlur: () => 90 * (1-this.activation2()),
      shadowColor: '#00000080',
      shadowOffsetX: () => 20 * (1-this.activation2()),
      shadowOffsetY: () => 20 * (1-this.activation2()),
    })
    this.panel2 = panel2
    this.add(this.panel2)
  }

  private initializeComponent(){

    this.panel.removeChildren()

    const component = this.data[this.dataIndex]
    let newComponent: any

    if(!component) return
      
    if(component.type === 'pieChart') {
      const dimensions = componentConfigs[component.type as keyof typeof componentConfigs]
      this.dx(dimensions.panelX)
      this.dy(dimensions.panelY)
      this.panel.padding(dimensions.padding)
      newComponent = new PieChart({data: component.data, title: component.title, diameter: dimensions.diameter})
    }
    if(component.type === 'barChart') {
      const dimensions = componentConfigs[component.type as keyof typeof componentConfigs]
      this.dx(dimensions.panelX)
      this.dy(dimensions.panelY)
      this.panel.padding(dimensions.padding)
      newComponent = new BarChart({data: component.data, barWidth: 70, maxChartWidth: dimensions.maxChartWidth, barGap: dimensions.barGap, height: dimensions.height,  title: component.title})
    }
    if(component.type === 'video') {
      const dimensions = componentConfigs[component.type as keyof typeof componentConfigs]
      this.dx(dimensions.panelX)
      this.dy(dimensions.panelY)
      this.panel.padding(dimensions.padding+7)
      newComponent = new Video({src: component.data, title: component.title, width: dimensions.width, radius: 35})
    }
    if(component.type === 'image') {
      const dimensions = componentConfigs[component.type as keyof typeof componentConfigs]
      this.panel.padding(dimensions.padding+7)
      newComponent = new Image({src: component.data,title: component.title, radius: 35, stroke: lineColor, lineWidth: 10})
      const currentWidth = newComponent.width()
      const currentHeight = newComponent.height()
      const scaleHeight = dimensions.maxHeight / currentHeight
      const scaleWidth = dimensions.maxWidth / currentWidth
      const scale = scaleHeight > scaleWidth ? scaleWidth : scaleHeight
      const newWidth = currentWidth * scale
      const newHeight = currentHeight * scale
      const dx = -1920/2 + newWidth/2 + 15 + 150
      this.dx(dx)
      newComponent.width(newWidth)
      newComponent.height(newHeight)
      
    }
    if(component.type === 'linePlot') {
      const dimensions = componentConfigs[component.type as keyof typeof componentConfigs]
      this.dx(dimensions.panelX)
      this.dy(dimensions.panelY)
      this.panel.padding(dimensions.padding)
      newComponent = new LinePlot({data: component.data, xTickFormatter: v => v.toFixed(1), yTickFormatter: v => v.toFixed(1), title: component.title, width: dimensions.width, height: dimensions.height, xLabel: component.xLabel, yLabel: component.yLabel})
    }
    if(component.type === 'keyValueTable') {
      const dimensions = componentConfigs[component.type as keyof typeof componentConfigs]
      this.dx(dimensions.panelX)
      this.dy(dimensions.panelY)
      this.panel.padding(dimensions.padding)
      newComponent = new KeyValueTable({data: component.data, columns: dimensions.columns, gapX: dimensions.gapX, gapY: dimensions.gapY})
    }
    if(component.type === 'text') {
      const dimensions = componentConfigs[component.type as keyof typeof componentConfigs]
      this.dx(dimensions.panelX)
      this.dy(dimensions.panelY)
      this.panel.padding(dimensions.padding)
      newComponent = new Text({text: component.data, textType: component.textType, author: component.author, subject: component.subject, date: component.date})
    }

    // const a = new Rect({layout: true, width: 300, height: 300})
    // const b = new Rect({layout: false})
    // b.add(newComponent)
    // a.add(b)
    // a.add(newComponent)
    // this.panel.add(a)

    this.panel.add(newComponent)
    this.component = newComponent
  }

  public *fadeIn(duration: number){
    this.initializeComponent()
    yield* all(
      this.component.fadeIn ? this.component.fadeIn(duration) : waitFor(0),
      this.activation(1, duration)
    )
  }
  
  public *next(duration: number){
    this.panel.removeChildren()
    this.activation(0)
    this.panel2.opacity(1)
    this.panel2.add(this.component)
    this.panel2.x(this.dx())
    this.panel2.padding(this.panel.padding())
    this.dataIndex++
    this.initializeComponent()
    yield* all(
      this.activation(1, duration),
      this.activation2(1, duration),
      this.component.fadeIn ? this.component.fadeIn(duration) : waitFor(0),
    )
    this.panel2.removeChildren()
    this.activation2(0)
    this.panel2.opacity(0)
  }

  public *fadeOut(duration: number){
    yield* this.activation(0, duration)
    this.dataIndex++
  }
}