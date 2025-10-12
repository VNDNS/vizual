import { Rect, initial, signal, Line, NodeProps, Txt } from "@motion-canvas/2d"
import { SimpleSignal, Vector2, PossibleVector2 } from "@motion-canvas/core"
import { debug } from "../../../debug"

export interface PlotProps extends NodeProps {
  width: number
  height: number
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  showAxes?: boolean
  showTicks?: boolean
  xTickCount?: number
  yTickCount?: number
  tickLength?: number
  showTickLabels?: boolean
  xTickFormatter?: (value: number) => string
  yTickFormatter?: (value: number) => string
  tickLabelFontSize?: number
  tickLabelColor?: string
  tickLabelPadding?: number
}

export class Plot extends Rect {
  @initial(0)
  @signal()
  public declare readonly xMin: SimpleSignal<number, this>

  @initial(100)
  @signal()
  public declare readonly xMax: SimpleSignal<number, this>

  @initial(0)
  @signal()
  public declare readonly yMin: SimpleSignal<number, this>

  @initial(100)
  @signal()
  public declare readonly yMax: SimpleSignal<number, this>

  @initial(true)
  @signal()
  public declare readonly showAxes: SimpleSignal<boolean, this>

  @initial(true)
  @signal()
  public declare readonly showTicks: SimpleSignal<boolean, this>

  @initial(true)
  @signal()
  public declare readonly showTickLabels: SimpleSignal<boolean, this>

  private plotWidth: number
  private plotHeight: number
  public rect: Rect
  private xTickCount: number
  private yTickCount: number
  private tickLength: number
  private xTickFormatter: (value: number) => string
  private yTickFormatter: (value: number) => string
  private tickLabelFontSize: number
  private tickLabelColor: string
  private tickLabelPadding: number

  public constructor(props: PlotProps) {
    const debugProps = debug ? {lineWidth: 1, stroke: 'lime'} : {}

    super({
      ...props,
      ...debugProps,
      layout: true,
      width: props.width,
      height: props.height,
    })

    this.rect = new Rect({
      layout: false,
    })
    this.add(this.rect)
    this.plotWidth = props.width
    this.plotHeight = props.height
    this.xTickCount = props.xTickCount ?? 5
    this.yTickCount = props.yTickCount ?? 5
    this.tickLength = props.tickLength ?? 10
    this.xTickFormatter = props.xTickFormatter ?? ((v: number) => `${v}`)
    this.yTickFormatter = props.yTickFormatter ?? ((v: number) => `${v}`)
    this.tickLabelFontSize = props.tickLabelFontSize ?? 25
    this.tickLabelColor = props.tickLabelColor ?? 'white'
    this.tickLabelPadding = props.tickLabelPadding ?? 18

    if (props.xMin) this.xMin(props.xMin)
    if (props.xMax) this.xMax(props.xMax)
    if (props.yMin) this.yMin(props.yMin)
    if (props.yMax) this.yMax(props.yMax)

    if (props.showAxes !== undefined) {
      this.showAxes(props.showAxes)
    }

    if (props.showTicks !== undefined) {
      this.showTicks(props.showTicks)
    }

    if (props.showTickLabels !== undefined) {
      this.showTickLabels(props.showTickLabels)
    }

    this.initializeAxes()
    this.initializeTicks()
    this.initializeTickLabels()
  }

  public mapToLocal(dataPoint: PossibleVector2): Vector2 {
    const p = new Vector2(dataPoint)
    const rangeX = this.xMax() - this.xMin()
    const rangeY = this.yMax() - this.yMin()
    const width = this.plotWidth
    const height = this.plotHeight
    const offset = this.offset()

    const proportionX = rangeX === 0 ? 0.5 : (p.x - this.xMin()) / rangeX
    const proportionY = rangeY === 0 ? 0.5 : (p.y - this.yMin()) / rangeY

    const pixelXFromTopLeft = proportionX * width
    const pixelYFromTopLeft = (1 - proportionY) * height

    const originXFromTopLeft = width * (offset.x * 0.5 + 0.5)
    const originYFromTopLeft = height * (offset.y * 0.5 + 0.5)

    const localX = pixelXFromTopLeft - originXFromTopLeft
    const localY = pixelYFromTopLeft - originYFromTopLeft

    return new Vector2(localX, localY)
  }

  public mapFromLocal(localPoint: PossibleVector2): Vector2 {
    const p = new Vector2(localPoint)
    const rangeX = this.xMax() - this.xMin()
    const rangeY = this.yMax() - this.yMin()
    const width = this.plotWidth
    const height = this.plotHeight
    const offset = this.offset()

    const originXFromTopLeft = width * (offset.x * 0.5 + 0.5)
    const originYFromTopLeft = height * (offset.y * 0.5 + 0.5)

    const pixelXFromTopLeft = p.x + originXFromTopLeft
    const pixelYFromTopLeft = p.y + originYFromTopLeft
    
    const proportionX = width === 0 ? 0.5 : pixelXFromTopLeft / width
    const proportionY = height === 0 ? 0.5 : (height - pixelYFromTopLeft) / height

    const internalX = this.xMin() + proportionX * rangeX
    const internalY = this.yMin() + proportionY * rangeY

    return new Vector2(internalX, internalY)
  }

  private initializeAxes() {
    const xAxis = new Line({
      points: () => {
        const y = Math.max(this.yMin(), Math.min(0, this.yMax()))
        return [
          this.mapToLocal({ x: this.xMin(), y }),
          this.mapToLocal({ x: this.xMax(), y }),
        ]
      },
      stroke: 'white',
      lineWidth: 2,
      lineCap: 'round',
      opacity: () => (this.showAxes() ? 1 : 0),
    })

    const yAxis = new Line({
      points: () => {
        const x = Math.max(this.xMin(), Math.min(0, this.xMax()))
        return [
          this.mapToLocal({ x, y: this.yMin() }),
          this.mapToLocal({ x, y: this.yMax() }),
        ]
      },
      stroke: 'white',
      lineWidth: 2,
      lineCap: 'round',
      opacity: () => (this.showAxes() ? 1 : 0),
    })

    this.rect.add(xAxis)
    this.rect.add(yAxis)
  }

  private initializeTicks() {
    // X-axis ticks (vertical marks along x)
    for (let i = 0; i <= this.xTickCount; i++) {
      const tick = new Line({
        points: () => {
          const t = this.xTickCount === 0 ? 0 : i / this.xTickCount
          const xVal = this.xMin() + t * (this.xMax() - this.xMin())
          const yAxisY = Math.max(this.yMin(), Math.min(0, this.yMax()))
          const center = this.mapToLocal({ x: xVal, y: yAxisY })
          return [
            { x: center.x, y: center.y - this.tickLength / 2 },
            { x: center.x, y: center.y + this.tickLength / 2 },
          ]
        },
        stroke: 'white',
        lineWidth: 2,
        opacity: () => (this.showAxes() && this.showTicks() ? 1 : 0),
      })
      this.rect.add(tick)
    }

    // Y-axis ticks (horizontal marks along y)
    for (let j = 0; j <= this.yTickCount; j++) {
      const tick = new Line({
        points: () => {
          const t = this.yTickCount === 0 ? 0 : j / this.yTickCount
          const yVal = this.yMin() + t * (this.yMax() - this.yMin())
          const xAxisX = Math.max(this.xMin(), Math.min(0, this.xMax()))
          const center = this.mapToLocal({ x: xAxisX, y: yVal })
          return [
            { x: center.x - this.tickLength / 2, y: center.y },
            { x: center.x + this.tickLength / 2, y: center.y },
          ]
        },
        stroke: 'white',
        lineWidth: 2,
        opacity: () => (this.showAxes() && this.showTicks() ? 1 : 0),
      })
      this.rect.add(tick)
    }
  }

  private initializeTickLabels() {
    for (let i = 0; i <= this.xTickCount; i++) {
      const label = new Txt({
        text: () => {
          const t = this.xTickCount === 0 ? 0 : i / this.xTickCount
          const xVal = this.xMin() + t * (this.xMax() - this.xMin())
          return this.xTickFormatter(xVal)
        },
        fontSize: this.tickLabelFontSize,
        fontFamily: 'Rubik',
        fontWeight: 400,
        fill: this.tickLabelColor,
        textAlign: 'center',
        position: () => {
          const t = this.xTickCount === 0 ? 0 : i / this.xTickCount
          const xVal = this.xMin() + t * (this.xMax() - this.xMin())
          const yAxisY = Math.max(this.yMin(), Math.min(0, this.yMax()))
          const center = this.mapToLocal({ x: xVal, y: yAxisY })
          return [center.x, center.y + this.tickLength / 2 + this.tickLabelPadding]
        },
        opacity: () => (this.showAxes() && this.showTicks() && this.showTickLabels() ? 1 : 0),
      })
      this.rect.add(label)
    }

    for (let j = 0; j <= this.yTickCount; j++) {
      const label = new Txt({
        text: () => {
          const t = this.yTickCount === 0 ? 0 : j / this.yTickCount
          const yVal = this.yMin() + t * (this.yMax() - this.yMin())
          return this.yTickFormatter(yVal)
        },
        fontSize: this.tickLabelFontSize,
        fontFamily: 'Rubik',
        fontWeight: 400,
        fill: this.tickLabelColor,
        position: () => {
          const t = this.yTickCount === 0 ? 0 : j / this.yTickCount
          const yVal = this.yMin() + t * (this.yMax() - this.yMin())
          const xAxisX = Math.max(this.xMin(), Math.min(0, this.xMax()))
          const center = this.mapToLocal({ x: xAxisX, y: yVal })
          return [center.x - this.tickLength / 2 - this.tickLabelPadding, center.y]
        },
        offsetX: 1,
        opacity: () => (this.showAxes() && this.showTicks() && this.showTickLabels() ? 1 : 0),
      })
      this.rect.add(label)
    }
  }
} 