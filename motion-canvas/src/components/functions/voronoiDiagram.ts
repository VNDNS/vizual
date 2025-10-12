import { Point } from "./Point";

/* 
The function computed the voronoi diagram of a set of points.
if returns the voronoi diagram in the shape Point[][].
Each entry represents a voronoi cell described by a set of points.
*/

const dot = (a: Point, b: Point): number => a.x * b.x + a.y * b.y;

const clipWithBisector = (polygon: Point[], s: Point, t: Point): Point[] => {
  if (polygon.length === 0) return [];
  const d = { x: t.x - s.x, y: t.y - s.y };
  const dd = d.x * d.x + d.y * d.y;
  if (dd === 0) return polygon.slice();
  const c = 0.5 * (t.x * t.x + t.y * t.y - s.x * s.x - s.y * s.y);
  const inside = (p: Point) => dot(p, d) <= c + 1e-9;

  const n = polygon.length;
  const out: Point[] = [];
  for (let i = 0; i < n; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % n];
    const fa = dot(a, d) - c;
    const fb = dot(b, d) - c;
    const aIn = fa <= 1e-9;
    const bIn = fb <= 1e-9;

    if (aIn && bIn) {
      out.push({ x: b.x, y: b.y });
      continue;
    }

    const denom = (b.x - a.x) * d.x + (b.y - a.y) * d.y;
    if ((aIn && !bIn) || (!aIn && bIn)) {
      if (Math.abs(denom) > 1e-12) {
        const tParam = (c - dot(a, d)) / denom;
        const x = a.x + (b.x - a.x) * tParam;
        const y = a.y + (b.y - a.y) * tParam;
        out.push({ x, y });
      }
      if (!aIn && bIn) out.push({ x: b.x, y: b.y });
    }
  }
  return out;
};

export const voronoiDiagram = (domain: Point[], points: Point[]): Point[][] => {
  if (!domain || domain.length === 0) return [];
  if (!points || points.length === 0) return [];

  const cells: Point[][] = [];
  for (let i = 0; i < points.length; i++) {
    let cell = domain.slice();
    const s = points[i];
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const t = points[j];
      cell = clipWithBisector(cell, s, t);
      if (cell.length === 0) break;
    }
    cells.push(cell);
  }
  return cells;
}