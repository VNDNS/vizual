import { initial, signal, Rect, Txt, Node, Img, NodeProps, Line, VideoProps as VideoMotionCanvasProps, Video as VideoMotionCanvas } from "@motion-canvas/2d"
import { SimpleSignal, all, createSignal, sequence, waitFor } from "@motion-canvas/core"
import { hsl } from "./DynamicBarChart"
import { debug } from '../../../debug'

interface VideoProps extends VideoMotionCanvasProps {
  title: string
}

export class Video extends VideoMotionCanvas {

  private title: string

  public constructor(props: VideoProps) {
    super({...props})
    this.opacity(1)
    this.title = props.title
    this.initializeTitle()
  }

  private initializeTitle(){
    const title = new Txt({
      text: this.title,
      fontSize: 35,
      opacity: 1,
      offset: [0, -1],
      fontFamily: 'Rubik',
      fontWeight: 400,
      y: this.height()/2 + 30,
      fill: "white",
    })
    //this.add(title)
  }

  public *fadeIn(duration: number) {
    this.play()
    const dt = this.getDuration()
    yield* all(
      // this.opacity(1, duration),
      waitFor(dt)
    )
    
  }

  public *fadeOut(duration: number) {
    // yield* this.opacity(0, duration)
    this.pause()
  }
} 