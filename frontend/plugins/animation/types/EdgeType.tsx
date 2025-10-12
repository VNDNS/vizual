
export interface EdgeType {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  joints?: { id: string; x: number; y: number; s?: number; children?: string[] }[];
  sourceId?: string | number;
  targetId?: string | number;
  startSide?: 'top' | 'bottom' | 'left' | 'right';
  endSide?: 'top' | 'bottom' | 'left' | 'right';
  c0?: number;
  c1?: number;
  points?: { x: number; y: number }[];
  externalTargetId?: string | number;
}
