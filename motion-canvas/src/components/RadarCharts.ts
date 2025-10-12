import { Node, NodeProps, Line, Txt, initial, signal, Rect } from "@motion-canvas/2d";
import { SimpleSignal, createSignal, Color, SignalValue } from "@motion-canvas/core";
import { hsl } from "./DynamicBarChart";
import { polarToCartesian } from "./functions/polarToCartesian";
import { RadarChart } from "./RadarChart";


interface RadarChartsData {
  columns: string[]
  rows: string[]
  values: number[][]
}

interface RadarChartsProps extends NodeProps {
  data: RadarChartsData
  height: number;
  width: number;
  lineWidth?: SignalValue<number>;
  maxValue?: number;
  distance?: number;
}

export class RadarCharts extends Node {

  @initial(300)
  @signal()
  public declare readonly radius: SimpleSignal<number, this>;

  @initial(8)
  @signal()
  public declare readonly lineWidth: SimpleSignal<number, this>;

  @signal()
  public declare readonly width: SimpleSignal<number, this>;

  @signal()
  public declare readonly height: SimpleSignal<number, this>;

  private activations: SimpleSignal<number, this>[];
  private maxValue: number;
  private data: RadarChartsData;
  private charts: RadarChart[];
  private distance: number;

  
  public constructor(props: RadarChartsProps) {
    const n = props.data.columns.length;
    super(props);
    this.radius(props.height/2);
    this.width(props.width);
    this.height(props.height);
    this.lineWidth(props.lineWidth ?? 8);
    this.maxValue = props.maxValue ?? this.calculateMaxValue(props.data);
    this.data = props.data;
    this.distance = (this.width() - this.radius()*2) / (n-1);
    this.charts = [];
    this.initializeActivation();
    this.initializeRadarCharts();
  }

  private calculateMaxValue(data: RadarChartsData): number {
    let max = 0;
    for (const item of data.values) {
      for (const value of item) {
        if (value > max) {
          max = value;
        }
      }
    }
    return max;
  }

  private initializeRadarCharts() {
    for (let i = 0; i < this.data.columns.length; i++) {
      const data = {
        name: this.data.columns[i],
        values: this.data.values[i].map((value, index) => ({ name: this.data.rows[index], value })),
      }
      const rect = new Rect({ width: this.width(), height: this.height(), fill: "red", opacity: 0.1 });
      //this.add(rect);
      const n = this.data.columns.length;
      const x = i * this.distance - this.width() / 2 + this.radius();
      const radarChart = new RadarChart({ data, radius: this.radius, lineWidth: this.lineWidth, maxValue: this.maxValue, x, y: 0, color: hsl(i, n) });
      this.charts.push(radarChart);
      this.add(radarChart);

    }
  }

  private initializeActivation() {
    this.activations = this.data.columns.map(() => createSignal(0));
  }

  public *activate(index: number, duration: number) {
    yield* this.charts[index].activate(duration);
  }

  public *deactivate(index: number, duration: number) {
    yield* this.charts[index].deactivate(duration);
  }
}