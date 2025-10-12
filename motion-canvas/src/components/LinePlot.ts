import { Circle, Line, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { SimpleSignal, createSignal, sequence, all } from "@motion-canvas/core";
import { Plot, PlotProps } from "./Plot";
import { hsl } from "./DynamicBarChart";

interface DataPoint {
  x: number;
  y: number;
}

interface LinePlotData {
  name: string;
  values: DataPoint[]
}

interface LinePlotProps extends PlotProps {
  data: LinePlotData[];
  width: number;
  height: number;
  lineWidth?: number;
  title?: string;
  xLabel?: string;
  yLabel?: string;
}

export class LinePlot extends Plot {
  public readonly lines: Line[];
  public readonly circles: Circle[][];
  private activations: SimpleSignal<number, this>[];
  private data: LinePlotData[];
  private title: string;
  private xLabel: string;
  private yLabel: string;
  
  constructor(props: LinePlotProps) {
    const { data } = props;

    const allPoints = data.flatMap(d => d.values);
    
    if (allPoints.length === 0) {
      super({ ...props, xMin: 0, xMax: 1, yMin: 0, yMax: 1 });
      this.lines = [];
      this.circles = [];
      this.activations = [];
      this.data = [];
      this.title = '';
      this.xLabel = '';
      this.yLabel = '';
      return;
    }

    const xValues = allPoints.map(p => p.x);
    const yValues = allPoints.map(p => p.y);

    const xMin = props.xMin ?? Math.min(...xValues);
    const xMax = props.xMax ?? Math.max(...xValues);
    const yMin = props.yMin ?? Math.min(...yValues);
    const yMax = props.yMax ?? Math.max(...yValues);

    const yPadding = (yMax - yMin) * 0.1;

    super({
      ...props,
      xMin,
      xMax,
      yMin: yMin === yMax ? yMin - 1 : yMin - yPadding,
      yMax: yMin === yMax ? yMax + 1 : yMax + yPadding,
    });
    this.title = props.title ?? '';
    this.xLabel = props.xLabel ?? '';
    this.yLabel = props.yLabel ?? '';

    console.log(props)

    this.data = data;
    this.circles = data.map((): Circle[] => [])
    this.initializeActivations();
    this.initializeLines();
    this.initializeLegend();
    this.initializeTitle();
    this.initializeAxisLabels();
  }

  private initializeActivations() {
    this.activations = this.data.map(() => createSignal(0));
  }

  private initializeLines() {
    this.data.forEach((_, i) => {
      this.initializeLine(i)
      this.initializeCircles(i)
    });
  }

  private initializeLine(index: number) {
    
    const activation = this.activations[index]
    const series = this.data[index]

    const points = () => series.values.map(d => this.mapToLocal({ x: d.x, y: d.y }))
    const color = hsl(index, this.data.length)

    const line = new Line({
      points,
      stroke: color,
      lineWidth: 4,
      lineCap: 'round',
      end: activation,
    })

    this.rect.add(line);
  }

  private initializeLegend() {
    for(let i = 0; i < this.data.length; i++) {
      this.createLegendItem(this.data[i], i)
    }
  }

  private createLegendItem(item: LinePlotData, index: number) {
    const legendItem = new Rect({
      layout: true,
      direction: 'row',
      alignItems: 'center',
      position: [ -this.width()/2 + 100, -this.height()/2+35*index+20],
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
      fontSize: 30,
      fontWeight: 400,
      fill: 'white'
    })

    legendItem.add(colorIndicator)
    legendItem.add(legendText)
    this.rect.add(legendItem)
  }

  private initializeCircles(index: number) {
    const series = this.data[index]
    const color = hsl(index, this.data.length)
    series.values.forEach(d => {
      const point = this.mapToLocal({ x: d.x, y: d.y })
      const circle = new Circle({
        position: point,
        size: 0,
        fill: color,
      })
      this.circles[index].push(circle)
      this.rect.add(circle)
    })
  }

  private initializeTitle() {
    const title = new Txt({
      text: this.title,
      fontSize: 35,
      opacity: 1,
      offset: [0, -1],
      fontFamily: 'Rubik',
      fontWeight: 400,
      y: -this.height()/2-60,
      fill: "white",
    })
    this.rect.add(title)
  }

  private initializeAxisLabels() {
    if (this.xLabel) {
      const xTxt = new Txt({
        text: this.xLabel,
        fontSize: 28,
        fontWeight: 400,
        fontFamily: 'Rubik',
        fill: 'white',
        y: this.height()/2 + 50,
        opacity: () => (this.showAxes() ? 1 : 0),
      })
      this.rect.add(xTxt)
    }

    if (this.yLabel) {
      const yTxt = new Txt({
        text: this.yLabel,
        fontSize: 28,
        fontWeight: 400,
        fontFamily: 'Rubik',
        fill: 'white',
        x: -this.width()/2 - 95,
        y: 0,
        rotation: -90,
        opacity: () => (this.showAxes() ? 1 : 0),
      })
      this.rect.add(yTxt)
    }
  }


  public *activate(index: number, c: number) {
    const n = this.data[index].values.length
    const duration = 1/n
    yield* all(
      sequence(duration, ...this.circles[index].map(circle => circle.size(15, .5))),
      this.activations[index](1, 2)
    )
  }

  public *fadeIn(duration: number) {
    const animations = this.activations.map((_, i) => this.activate(i, 1))
    yield* sequence(.3, ...animations)
  }

  public *fadeOut(duration: number) {
    yield* this.opacity(0, duration)
  }

  public *deactivate(index: number, c: number) {
    const n = this.data[index].values.length
    const duration = 1/n
    yield* all(
      this.activations[index](0, 2),
      sequence(duration, ...this.circles[index].reverse().map(c => c.size(0, .5))),
    )
  }
}