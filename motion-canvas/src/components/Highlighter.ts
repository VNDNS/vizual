import { Grid, GridProps, Img, initial, Line, Node, NodeProps, Rect, signal, Txt, View2D } from "@motion-canvas/2d"
import { all, SimpleSignal } from "@motion-canvas/core"

export interface HighlighterProps extends NodeProps { 
  view: View2D
  components: any[]
}

export class Highlighter extends Node {

  private view_: View2D
  private components: any[]

  public constructor(props: HighlighterProps){
    super({...props})
    this.view_ = props.view
    this.components = props.components




    // const grid = new Grid({width: 1900, height: 1080, spacing: {x: 60, y: 60}})
    // this.view_.add(grid)
  }
  
  public *highlight(nodes: string[], component: string, duration: number){



    const overlay = new Rect({
      width: 999999999,
      height: 999999999,
      fill: 'rgba(0,0,0,0.6)',
      zIndex: 100000,
      key: 'overlay',
      opacity: 0,
    })
    this.components[0].add(overlay)
    const foundComponent = this.view_.findKey(component)


    foundComponent.add(overlay)
    nodes.forEach((node) => {
      const foundNode = this.view_.findKey(node)
      foundNode.zIndex(102000)
    })


    yield*all(
      overlay.opacity(1,duration),
    )
  }

  public *reset(){
    const overlay = this.view_.findKey('overlay')
    yield* overlay.opacity(0, 1)
    overlay.remove()
  }
}