import { Node } from "@motion-canvas/2d"
import { SimpleSignal, all, createSignal, sequence } from "@motion-canvas/core"
import { FlowChartNode } from "./FlowChartNode"
import { FlowChartEdge } from "./FlowChartEdge"
import { FlowChartProps } from "./types/FlowChartProps"
import { FlowChartConfig } from "./types/FlowChartConfig"

export class FlowChart extends Node {

  private config: FlowChartConfig
  private edges: FlowChartEdge[] = []
  private nodes: FlowChartNode[] = []

  public constructor(props: FlowChartProps) {
    super({...props, key: props.data.name})

    this.config = props.data

    this.initializeNodes()
    this.initializeEdges()
  }

  private initializeNodes() {
    for (let i = 0; i < this.config.nodes.length; i++) {
      const flowChartNode = new FlowChartNode(this, this.config.nodes[i])
      this.nodes.push(flowChartNode)
    }
  }

  private initializeEdges() {
    for (let i = 0; i < this.config.edges.length; i++) {
      const flowChartEdge = new FlowChartEdge(this, this.config.edges[i])
      this.edges.push(flowChartEdge)
    }
  }

  public *activate(nodeName: string, duration: number) {

    const targetNode = this.config.nodes.find(n => n.name === nodeName)
    const edgeIndex = this.config.edges.findIndex(e => e.targetId === targetNode?.id)
    const nodeIndex = this.config.nodes.findIndex(n => n.id === targetNode?.id)
    
    yield* all(
      this.edges[edgeIndex]?.fadeIn(),
      this.nodes[nodeIndex].fadeIn()
    )
  }

  public *fadeIn(nodeNames: (string)[], duration: number) {
    
    const animations = []
    
    for(let i = 0; i < nodeNames.length; i++) {
      animations.push(this.activate(nodeNames[i], 1))
    }

    yield* sequence(.3, ...animations)
  }
} 