import { Node, NodeProps, Line, Txt, initial, signal } from "@motion-canvas/2d";
import { SimpleSignal, createSignal, Color, SignalValue } from "@motion-canvas/core";
import { hsl } from "./DynamicBarChart";
import { polarToCartesian } from "./functions/polarToCartesian";


interface RadarChartData {
  name: string
  values: {
    name: string
    value: number
  }[]
  logo?: string
}

interface RadarChartProps extends NodeProps {
  data: RadarChartData
  radius?: SignalValue<number>;
  lineWidth?: SignalValue<number>;
  maxValue?: number;
  color?: string;
}

export class RadarChart extends Node {

  @initial(300)
  @signal()
  public declare readonly radius: SimpleSignal<number, this>;

  @initial(8)
  @signal()
  public declare readonly lineWidth: SimpleSignal<number, this>;

  private activation: SimpleSignal<number, this>;
  private maxValue: number;
  private color: string;
  public constructor(props: RadarChartProps) {
    super(props);
    this.radius(props.radius ?? 300);
    this.lineWidth(props.lineWidth ?? 8);
    this.maxValue = props.maxValue ?? this.calculateMaxValue(props.data);
    this.color = props.color ?? hsl(0, 1);
    this.initializeActivation();
    this.initializeGrid(props.data);
    this.initializeShape(props.data);
    this.initializeLabels(props.data);
  }

  private calculateMaxValue(data: RadarChartData): number {
    let max = 0;
    for (const item of data.values) {
        if (item.value > max) {
          max = item.value;
        }
    }
    return max;
  }

  private initializeActivation() {
    this.activation = createSignal(0);
  }

  private initializeGrid(data: RadarChartData) {
    const numAxes = data?.values.length ?? 0;
    if (numAxes === 0) return;

    const angleStep = 360 / numAxes;

    const gridLevels = 5;
    for (let i = 1; i <= gridLevels; i++) {
      const r = this.radius() * (i / gridLevels);
      const points = [];
      for (let j = 0; j < numAxes; j++) {
        points.push(polarToCartesian(r, j * angleStep - 90));
      }
      this.add(
        new Line({
          points,
          closed: true,
          stroke: 'gray',
          radius: 20,
          lineWidth: 1,
          lineDash: [5, 5],
        }),
      );
    }

    for (let i = 0; i < numAxes; i++) {
      this.add(
        new Line({
          points: [
            [0, 0],
            polarToCartesian(this.radius() - 5, i * angleStep - 90),
          ],
          stroke: 'gray',
          lineWidth: 1,
        }),
      );
    }
  }

  private initializeLabels(data: RadarChartData) {
    const numAxes = data?.values.length ?? 0;
    if (numAxes === 0) return;
    const labels = data.values.map(v => v.name);
    const angleStep = 360 / numAxes;

    for (let i = 0; i < numAxes; i++) {
      const position = polarToCartesian(this.radius() * 1.1, i * angleStep - 90);
      const isLeft = position.x < -10;
      const isRight = position.x > 10;
      const xOffset = isLeft ? 1 : isRight ? -1 : 0;
      this.add(
        new Txt({
          text: labels[i],
          fill: '#ffffff',
          fontSize: 20,
          position,
          offset: [xOffset, 0],
        }),
      );
    }
  }

  private initializeShape(data: RadarChartData) {
    const numAxes = data?.values.length ?? 0;
    if (numAxes === 0) return;
    const angleStep = 360 / numAxes;

    const shape = new Line({
      points: () => {
        return data.values.map((item, j) => {
          const r = (item.value / this.maxValue) * this.radius();
          return polarToCartesian(r * this.activation(), j * angleStep - 90);
        });
      },
      fill: () => {
        const c = new Color(this.color);
        return c.alpha(0.3 * this.activation());
      },
      stroke: this.color,
      radius: 5,
      lineWidth: () => this.lineWidth() * this.activation(),
      closed: true,
    });
    this.add(shape);
  }

  public *activate(duration: number) {
    yield* this.activation(1, duration);
  }

  public *deactivate(duration: number) {
    yield* this.activation(0, duration);
  }
}