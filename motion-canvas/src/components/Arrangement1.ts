import { initial, signal, Rect, Txt, Node, Img, NodeProps } from "@motion-canvas/2d"
import { SimpleSignal, all, createSignal } from "@motion-canvas/core"
import { hsl } from "./DynamicBarChart"
import { BarChart } from "./BarChart"
import { Item } from "./Item"
import { KeyValueTable } from "./KeyValueTable"

interface Arrangement1Props extends NodeProps {
  data: any
}

export class Arrangement1 extends Node {


  barChart: BarChart
  items: Item[]
  keyValueTable: KeyValueTable
  data: any


  public constructor(props: Arrangement1Props) {
    super({...props})

    this.data = props.data
    this.items = []

    this.initializeBarChart()
    this.initializeItems()
    this.initializeKeyValueTable()
    this.initializeTitle()
  }

  public initializeTitle() {
    const title = new Txt({
      text: 'Number of transistors in millions',
      fontSize: 40,
      fill: 'white',
      x: -200,
      y: 550,
    })
    this.add(title)
  }
  
  private initializeBarChart() {
    this.barChart = new BarChart({
      width: 1000,
      height: 600,
      x: -100,
      y: 200,
      barGap: 8,
      barWidth: 32,
      data: this.data,
      startMaxValue: 200,
    })
    this.add(this.barChart)
  }

  private initializeItems() {
    this.items = this.data.map((item: any) => new Item({
      logo: `./${item.image}.png`,
      title: item.name,
      width: 700,
      height: 700,
      x: 1000,
      y: -200,
    }))

    this.items.forEach((item) => {
      item.opacity(1)
      this.add(item)
    })
  }

  private initializeKeyValueTable() {
    this.keyValueTable = new KeyValueTable({
      x: 350,
      y: -550,
      data: this.data[0].tableData,
      columns: 2,
    })
    this.add(this.keyValueTable)
  }

  public *activate(index: number, duration: number) {
    if (index === 0) {
      yield* this.items[index].x(-180, duration),
      yield* all(
        this.barChart.activate(index, 2*duration),
        this.keyValueTable.activate(duration)
      )
    } else {
      yield* all(
        this.items[index-1].x(this.items[index-1].x() - 1200, duration),
        this.keyValueTable.x(this.keyValueTable.x() - 1200, duration),
        this.items[index].x(-180, duration),
      )
      this.keyValueTable.turnOffCells()
      this.keyValueTable.x(350)
      this.keyValueTable.setData(this.data[index].tableData)
      yield* all(
        this.barChart.activate(index, 2*duration),
        this.keyValueTable.activate(duration)
      )
    }
  }
} 