
export interface EdgeConfig {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  joints: { id: string; x: number; y: number; s: number; children?: string[]; }[];
  points: { x: number; y: number; }[];
  sourceId: string | number;
  targetId: string | number;
}
