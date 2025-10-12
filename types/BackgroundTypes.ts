export interface BackgroundPoint {
  x: number
  y: number
  id: string
}

export interface BackgroundEdge {
  p0: string
  p1: string
  id: string
}

export interface BackgroundSection {
  points: string[]
  id: string
}

export interface BackgroundData {
  points: BackgroundPoint[]
  edges: BackgroundEdge[]
  sections: BackgroundSection[]
}

