/* 
This function calculates the convex hull of a set of points.
It returns the set of points, that defines the convex hull.
*/

import { Point } from "./Point"



export const convexHull = (points: Point[]): Point[] => {
  if (points.length <= 2) return points.slice()

  const cross = (o: Point, a: Point, b: Point): number =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)

  const sorted = [...points].sort((a, b) =>
    a.x === b.x ? a.y - b.y : a.x - b.x
  )

  const unique: Point[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 || sorted[i].x !== sorted[i - 1].x || sorted[i].y !== sorted[i - 1].y) {
      unique.push(sorted[i])
    }
  }

  if (unique.length <= 1) return unique.slice()

  const lower: Point[] = []
  for (const p of unique) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop()
    }
    lower.push(p)
  }

  const upper: Point[] = []
  for (let i = unique.length - 1; i >= 0; i--) {
    const p = unique[i]
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop()
    }
    upper.push(p)
  }

  upper.pop()
  lower.pop()
  return lower.concat(upper)
}