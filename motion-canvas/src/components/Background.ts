import { Img, initial, Line, Node, NodeProps, Rect, signal, Txt } from "@motion-canvas/2d"
import { all, createSignal, SimpleSignal, tween } from "@motion-canvas/core"
import { hsl } from "./hsl";
import { offsetPolygon } from "./functions/offsetPolygon";

export interface BackgroundProps extends NodeProps {
  data: any
}

export class Background extends Node {


  @initial(1)
  @signal()
  private declare readonly activation: SimpleSignal<number, this>;
  
  private data: any
  private activations: SimpleSignal<number, this>[]
  private sections: any[]
  
  public constructor(props: BackgroundProps){
    super({...props})
    this.opacity(this.activation)
    this.data = props.data
    this.initializeActivations()
    this.sections = []
    this.initializeBackground()
  }

  private initializeActivations() {
    this.activations = this.data.sections.map((_: any, i: number) => createSignal(0))
  }

  private initializeBackground(){
    const points = this.data.points
    const sections = this.data.sections
    const pointById = new Map<string, any>(points.map((p: any) => [p.id, p]))
    const orderedOutlineIds = () => {
      if (Array.isArray(sections) && sections.length > 0) {
        const edgeUseCount = new Map<string, number>()
        const makeKey = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`)
        sections.forEach((section: any) => {
          const ids: string[] = section.points
          if (!Array.isArray(ids) || ids.length < 2) return
          for (let i = 0; i < ids.length; i++) {
            const a = ids[i]
            const b = ids[(i + 1) % ids.length]
            const key = makeKey(a, b)
            edgeUseCount.set(key, (edgeUseCount.get(key) || 0) + 1)
          }
        })
        const boundaryNeighbors = new Map<string, string[]>()
        edgeUseCount.forEach((count, key) => {
          if (count === 1) {
            const [a, b] = key.split('|')
            if (!boundaryNeighbors.has(a)) boundaryNeighbors.set(a, [])
            if (!boundaryNeighbors.has(b)) boundaryNeighbors.set(b, [])
            boundaryNeighbors.get(a)!.push(b)
            boundaryNeighbors.get(b)!.push(a)
          }
        })
        const start = boundaryNeighbors.keys().next().value as string | undefined
        if (!start) return points.map((p: any) => p.id)
        const result: string[] = [start]
        let prev: string | null = null
        let current: string = start
        while (true) {
          const nextCandidates = boundaryNeighbors.get(current) || []
          const next = nextCandidates.find(n => n !== prev)
          if (!next) break
          if (next === start) {
            break
          }
          result.push(next)
          prev = current
          current = next
        }
        return result
      }
      return points.map((p: any) => p.id)
    }
    const outlinePoints = () => orderedOutlineIds().map((id: string) => pointById.get(id) as any).filter(Boolean) as any[]
    // const shape = new Line({ points: outlinePoints, fill: hsl(0, 60, 60),  stroke: 'rgba(255,180,180,1)', lineWidth: 15, lineJoin: 'round', radius: 60, clip: true, closed: true, zIndex: -1000 })
    const shape = new Node({})
    this.add(shape)
    sections.forEach((section: {points: string[], id: string}, index: number) => {
      const points = section.points.map((id: string) => pointById.get(id) as any).filter(Boolean) as any[]
      const fill = hsl(index * 360 / sections.length, 30, 40)
      const offset = 15
      const stroke = hsl(index*360/ sections.length, 20, 60)
      const offsetPoints = offsetPolygon(points, -offset)
      const shape_ = new Line({ points: () => offsetPoints, fill: fill, opacity: this.activations[index],radius: 20, closed: true, zIndex: -1000 })
      const border = new Line({ points: () => offsetPoints, opacity: 0, end: 0, stroke: stroke, lineWidth: 10, lineJoin: 'round', radius: 20, closed: true, zIndex: -1000 })
      shape.add(shape_)
      shape.add(border)
      this.sections.push({shape: shape_, border: border})
    })


  }

  public *activate(index: number, duration: number){
    yield* all(
      this.sections[index].border.opacity(1, .1),
      this.sections[index].border.end(1, duration*.7),
    )
    yield* this.activations[index](1, duration*.3)
  }

  public *deactivate(index: number, duration: number){
    yield* this.activation(0, duration)
  }
}