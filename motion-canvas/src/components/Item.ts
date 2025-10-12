import { Img, initial, Node, NodeProps, Rect, signal, Txt } from "@motion-canvas/2d"
import { SimpleSignal } from "@motion-canvas/core"

export interface ItemProps extends NodeProps {
  logo: string
  title?: string
  width: number
  height: number
}

export class Item extends Node {

  private logo: string
  private width: number
  private height: number
  private title: string

  @initial(1)
  @signal()
  private declare readonly activation: SimpleSignal<number, this>;
  
  public constructor(props: ItemProps){
    super({...props})
    this.logo = props.logo
    this.width = props.width
    this.height = props.height
    this.title = props.title || "item"
    this.initializeLogo()
    this.initializeTitle()
    this.opacity(this.activation)
  }

  private initializeLogo(){
    if(!this.logo) return
    const logoSrc = this.logo
    const logo = new Img({
      src: logoSrc,
      width: this.width,
      height: this.height,
      offset: [0, 1]
    })
    this.add(logo)


  }

  private initializeTitle(){
    const title = new Txt({
      text: this.title,
      fontSize: 60,
      opacity: 0,
      fill: "white",
      position: [0, -80],
      offset: [0, -1]
    })
    const rect = new Rect({
      width: this.width,
      height: this.height,
      fill: 'coral',
      opacity: 0,
      radius: 10,
    })
    this.add(rect)
    this.add(title)
  }

  public *activate(index: number, duration: number){
    yield* this.activation(1, duration)
  }

  public *deactivate(index: number, duration: number){
    yield* this.activation(0, duration)
  }
}