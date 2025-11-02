export type NodeType = 'square' | 'circle' | 'container' | 'container-child'

export type EdgeSide = 'top' | 'bottom' | 'left' | 'right'

export interface FlowChartNode {
  id: number
  name: string
  x: number
  y: number
  year: number
  parent?: number
  parents?: number[]
  children: number[]
  text?: string
  group?: string
  type: NodeType
  startSide?: EdgeSide
  endSide?: EdgeSide
  suggestedChildren?: string[]
  componentId?: string | number
  image?: string
  imageWidth?: number
  width?: number
  height?: number
  color?: string
}

export interface EdgeJoint {
  id: string
  x: number
  y: number
  s: number
  children?: string[]
}

export interface EdgePoint {
  x: number
  y: number
}

export interface FlowChartEdge {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  sourceId: string | number
  targetId: string | number
  startSide?: EdgeSide
  endSide?: EdgeSide
  c0?: number
  c1?: number
  joints?: EdgeJoint[]
  points: EdgePoint[]
}

export interface FlowChartData {
  nodes: FlowChartNode[]
  edges: FlowChartEdge[]
  containerNodes: FlowChartNode[]
  name: string
}

export interface FlowChartConfiguration {
  data: FlowChartData
  x: number
  y: number
  size: number
}

