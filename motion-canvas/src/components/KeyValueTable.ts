import { initial, signal, Rect, Txt, Node, Img, NodeProps, Layout } from "@motion-canvas/2d"
import { SimpleSignal, all, createSignal, sequence } from "@motion-canvas/core"
import { hsl } from "./DynamicBarChart"
import { debug } from "../../../debug"
import { lineColor, nodeColor, tableColor } from "../../../frontend/plugins/animation/constants"

interface KeyValueTableData {
  key: string
  value: string
}

interface KeyValueTableProps extends NodeProps {
  data: KeyValueTableData[]
  columns: number
  gapX?: number
  gapY?: number
}

export class KeyValueTable extends Rect {


  private data: KeyValueTableData[]
  private columns: number
  private cells: Rect[]
  private cellValues: any[]
  private gapX: number
  private gapY: number

  public constructor(props: KeyValueTableProps) {

    
    
    const debugProps = debug ? {lineWidth: 1, stroke: 'lime'} : {}
    super({...props, layout: true, direction: 'column', ...debugProps, gap: props.gapX})
    // super({...props, layout: true, direction: 'column', ...debugProps, fill: tableColor, padding: 40, radius: 15, stroke: lineColor, lineWidth:5})
    
    this.gapX = props.gapX ?? 30
    this.gapY = props.gapY ?? 30
    //this.padding(this.gapX)
    this.data = props.data
    this.columns = props.columns
    this.cells = []
    this.cellValues = []
    this.initializeTable()
  }

  private initializeTable() {
    const nRows = Math.ceil(this.data.length / this.columns)

    this.cellValues = this.data.map((item) => createSignal(item.value))
    for (let i = 0; i < nRows; i++) {
      const row = new Layout({layout: true, gap: this.gapY})
      for (let j = 0; j < this.columns; j++) {
        if(i * this.columns + j >= this.data.length) break
        const cell = new Rect({width: 150, layout: true, direction: 'column', gap:10, opacity: 0})
        const label = new Txt({fill: 'rgb(187, 187, 187)', fontFamily: 'Rubik',text: this.data[i * this.columns + j]?.key || '', fontSize: 20, marginLeft: 0})
        const value = new Txt({fill: 'white', fontFamily: 'Rubik',text: () => this.cellValues[i * this.columns + j]() || '', fontSize: 30})
        cell.add(label)
        cell.add(value)
        row.add(cell)
        this.cells.push(cell)
      }
      this.add(row)
    }
  }
  


  public *activate(duration: number) {
    yield* sequence(.2,
      ...this.cells.map((cell) => {
        return cell.opacity(1, .6)
      })
    )
  }

  public *fadeIn(duration: number) {
    yield* all(
      this.activate(duration)
    )
  }

  public turnOffCells() {
    this.cells.map((cell) => {cell.opacity(0)})
  }

  public setData(data: KeyValueTableData[]) {
    this.data = data
    this.cellValues.forEach((value, index) => {
      value(this.data[index].value)
    })
  }
} 