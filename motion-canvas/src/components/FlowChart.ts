import { Node } from "@motion-canvas/2d"
import { SimpleSignal, all, createSignal, sequence, ThreadGenerator } from "@motion-canvas/core"
import { FlowChartNode } from "./FlowChartNode"
import { FlowChartEdge } from "./FlowChartEdge"
import { FlowChartProps } from "./types/FlowChartProps"
import { FlowChartConfig } from "./types/FlowChartConfig"

type AnimationClip = { animation: ThreadGenerator, duration: number }

export const all_ = (clips: AnimationClip[]) => {
  const duration = Math.max(...clips.map(clip => clip.duration))
  const animation = all(...clips.map(clip => clip.animation))
  return { animation, duration }
}

export const sequence_ = (spacing: number, clips: AnimationClip[]): AnimationClip => {

  const endings = clips.map((clip: any, index: number) => clip.duration + spacing * index)
  const totalDuration = Math.max(...endings)

  return {
    animation: sequence(spacing, ...clips.map(clip => clip.animation)),
    duration: totalDuration
  }
}

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
    
    const edgeClips: AnimationClip[] = []
    for (const index of edgeIndices) {
      const edge = this.edges[index]
      if (edge) {
        edgeClips.push(edge.fadeIn())
      }
    }
    
    const nodeClip = this.nodes[nodeIndex].fadeIn()
    const activateClip = all_([
      ...edgeClips,
      nodeClip
    ])
    
    yield* activateClip.animation
  }

  public fadeIn(nodeNames: (string)[], duration: number) {

    
    const activateClips: AnimationClip[] = []
    
    for(let i = 0; i < nodeNames.length; i++) {
      const nodeName = nodeNames[i]
      const nodeIndex = this.config.nodes.findIndex(n => n.name === nodeName)
      
      if (nodeIndex === -1 || !this.nodes[nodeIndex]) {
        continue
      }
      
      const targetNode = this.config.nodes[nodeIndex]
      const edgeIndices = this.config.edges
        .map((e, index) => e.targetId === targetNode.id ? index : -1)
        .filter(index => index !== -1)
      
      const edgeClips: AnimationClip[] = []
      for (const index of edgeIndices) {
        const edge = this.edges[index]
        if (edge) {
          edgeClips.push(edge.fadeIn())
        }
      }
      
      const nodeClip = this.nodes[nodeIndex].fadeIn()
      const activateClip = all_([
        ...edgeClips,
        nodeClip
      ])
      
      activateClips.push(activateClip)
    }

    const fadeInClip = sequence_(.3, activateClips)

    return fadeInClip
  }
} 