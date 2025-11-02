import { Node, NodeProps } from "@motion-canvas/2d"
import { all } from "./functions/all"

interface CameraProps extends NodeProps {
  initialX?: number
  initialY?: number
  initialZoom?: number
}

export class Camera extends Node {

  private _zoom: number = 1

  public constructor(props: CameraProps) {
    super({...props})
    
    if (props.initialX !== undefined && props.initialY !== undefined && props.initialZoom !== undefined) {
      this._zoom = props.initialZoom
      this.position([-props.initialX * this._zoom, -props.initialY * this._zoom])
      this.scale(this._zoom)
    }
  }

  public to(x: number, y: number, zoom: number, duration: number) {
    this._zoom = zoom 
    return all([
      { animation: this.position([-x*this._zoom, -y*this._zoom], duration), duration: duration },
      { animation: this.scale(this._zoom, duration), duration: duration }
    ])
  }
} 