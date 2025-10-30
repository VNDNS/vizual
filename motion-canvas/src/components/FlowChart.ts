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

  public updateConfig(newConfig: FlowChartConfig) {
    this.config = newConfig
    for (let i = 0; i < Math.min(this.nodes.length, this.config.nodes.length); i++) {
      this.nodes[i].updateConfig(this.config.nodes[i])
    }
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

    const nodeIndex = this.config.nodes.findIndex(n => n.name === nodeName)
    
    if (nodeIndex === -1 || !this.nodes[nodeIndex]) {
      return
    }
    
    const targetNode = this.config.nodes[nodeIndex]
    const edgeIndices = this.config.edges
      .map((e, index) => e.targetId === targetNode.id ? index : -1)
      .filter(index => index !== -1)
    
    const edgeAnimations = edgeIndices.map(index => this.edges[index]?.fadeIn())
    
    yield* all(
      ...edgeAnimations,
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