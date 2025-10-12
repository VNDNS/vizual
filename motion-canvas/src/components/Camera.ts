import { Node, NodeProps } from "@motion-canvas/2d"
import { all } from "@motion-canvas/core"

interface CameraProps extends NodeProps {
}

export class Camera extends Node {

  private _zoom: number = 1

  public constructor(props: CameraProps) {
    super({...props})
  }

  public *to(x: number, y: number, zoom: number, duration: number) {
    this._zoom = zoom 
    yield*all(
      this.position([-x*this._zoom, -y*this._zoom], duration),
      this.scale(this._zoom, duration)
    )
    // yield* this.position([-x, -y], duration),
    // yield* all(
    //   this.position([1920*.8, 0], duration),
    //   this.scale(2, duration)
    // )
    //yield* this.scale(2, duration)
  
  }
} 