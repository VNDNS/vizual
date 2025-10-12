import { initial, signal, Rect, Txt, Node, Img, NodeProps, Line, ImgProps as ImgMotionCanvasProps, Img as ImgMotionCanvas } from "@motion-canvas/2d"
import { SimpleSignal, all } from "@motion-canvas/core"
import { debug } from '../../../debug'

interface ImageProps extends ImgMotionCanvasProps {
  title: string
}

export class Image extends ImgMotionCanvas {

  private title: string

  public constructor(props: ImageProps) {
    super({...props})
    this.opacity(0)
    this.title = props.title
    //this.initializeTitle()
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
    yield* this.opacity(1, duration)
  }

  public *fadeOut(duration: number) {
    yield* this.opacity(0, duration)
  }
} 