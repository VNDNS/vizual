import { Node, NodeProps } from "@motion-canvas/2d"
import { all } from "./functions/all"

interface CameraProps extends NodeProps {
}

export class Camera extends Node {

  private _zoom: number = 1

  public constructor(props: CameraProps) {
    super({...props})
  }

  public to(x: number, y: number, zoom: number, duration: number) {
    this._zoom = zoom 
    return all([
      { animation: this.position([-x*this._zoom, -y*this._zoom], duration), duration: duration },
      { animation: this.scale(this._zoom, duration), duration: duration }
    ])
  }
} 