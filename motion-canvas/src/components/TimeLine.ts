import {
  Node,
  NodeProps,
  Rect,
  Line,
  Txt,
  initial,
  signal,
} from '@motion-canvas/2d';
import {
  SimpleSignal,
  Vector2,
  PossibleVector2,
  createSignal,
  tween,
} from '@motion-canvas/core';

interface DataPoint {
  t: number;
  event: string;
}

interface TimeLineProps extends NodeProps {
  data: DataPoint[];
  width: number;
  height: number;
  fps?: number;
  t0?: number;
  dt?: number;
}

export class TimeLine extends Node {
  private data: DataPoint[];
  public readonly t: SimpleSignal<number>;
  
  @signal()
  public declare readonly height: SimpleSignal<number, this>

  @signal()
  public declare readonly width: SimpleSignal<number, this>
  
  private tMin: () => number;
  private tMax: () => number;
  private fps: number;
  private currentTime: () => number
  private t0: number;
  

  public constructor(props: TimeLineProps) {
    super(props);
    this.t = createSignal(props.t0 ?? 0);
    this.fps = props.fps ?? 60;
    this.t0 = props.t0 ?? 0;
    const {data} = props;
    
    if (data.length === 0) {
      this.data = [];
      return;
    }
    
    this.tMin = () => this.t() - props.dt/2
    this.tMax = () => this.t() + props.dt/2

    this.data = data;
    this.height(props.height);
    this.width(props.width);
    this.add(new Rect({...props}));
    this.initializeAxis();
    //this.initializeTimeDisplay();
    this.initializeEvents();
  }

  public mapToLocal(dataPoint: PossibleVector2): Vector2 {
    const p = new Vector2(dataPoint);
    const rangeY = this.tMax() - this.tMin();
    const height = this.height();
    const proportionY = rangeY === 0 ? 0.5 : (p.y - this.tMin()) / rangeY;
    const localY = proportionY * height - height / 2;
    return new Vector2(p.x, localY);
  }

  private initializeAxis() {
    const axis = new Line({
      points: [
        this.mapToLocal({ x: 0, y: this.tMin() }),
        this.mapToLocal({ x: 0, y: this.tMax() }),
      ],
      stroke: 'white',
      lineWidth: 2,
      lineCap: 'round',
    });
    const minTick = new Line({
      points: [
        this.mapToLocal({ x: -20, y: this.tMin() }),
        this.mapToLocal({ x: 20, y: this.tMin() }),
      ],
      stroke: 'white',
      lineWidth: 2,
    })
    const maxTick = new Line({
      points: [
        {x: -20, y: this.height()/2},
        {x: 20, y: this.height()/2},
      ],
      stroke: 'white',
      lineWidth: 3,
    })
    const currentTimeTick = new Line({
      points: [{x: -20, y: 0}, {x: 20, y: 0}],
      stroke: 'white',
      lineWidth: 3,
    })
    const currentTimeLabel = new Txt({
      text: () => this.t().toFixed(),
      position: {x: -70, y: 0},
      fill: 'white',
      fontSize: 30,
    })
    this.add(axis);
    this.add(minTick);
    this.add(maxTick);
    this.add(currentTimeTick);
    this.add(currentTimeLabel);
  }

  private initializeEvents() {
    this.data.forEach(d => {
      const point = () => this.mapToLocal({ x: 0, y: d.t });

      const opacity1 = () => Math.max(0, Math.min(1, (d.t - this.tMin())))
      const opacity2 = () => Math.max(0, Math.min(1, (this.tMax()-5 - d.t)))
      const opacity = () => opacity1() * opacity2()
      
      const tick = new Line({
        points: () => [
          point().addX(-5),
          point().addX(5),
        ],
        stroke: 'white',
        lineWidth: 2,
        opacity: opacity,
      });

      const label = new Txt({
        text: d.event,
        x: () => point().x + 70,
        y: () => point().y,
        fill: 'white',
        fontSize: 30,
        opacity: opacity,
      });

      const timeLabel = new Txt({
        text: () => d.t.toFixed(),
        x: () => point().x - 70,
        y: () => point().y,
        offset: [-1, 0],
        fill: 'white',
        fontSize: 30,
        opacity: opacity,
      });

      this.add(tick);
      this.add(label);
      //this.add(timeLabel);
    });
  }

  private initializeTimeDisplay() {
    const timeText = new Txt({
      text: () => this.t().toFixed(),
      fontSize: 40,
      fill: 'white',
      x: () => 300,
      y: () => 200,
      offset: [1, 0],
    })
    this.add(timeText)
  }

  public *runClock(t1: number, duration: number) {
    const frames = duration * this.fps
    const dt = t1 - this.t()

    const cT = dt / frames
    yield* this.t(t1, duration)
  }
}
