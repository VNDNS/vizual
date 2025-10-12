import { convexHull } from "./convexHull"

type Point = {
  x: number
  y: number
}

/* 
This function takes a set of points representing a convex polygon and a square size.
It puts a square on each point of given square size.
It returns a set of points representing a line that wraps around the squares.
*/

export const offsetPoints = (points: Point[], squareSize: number): Point[] => {
  if (!points || points.length === 0) return []
  const half = squareSize / 2

  // Generate all square corners for each point
  const expanded: Point[] = []
  for (const p of points) {
    expanded.push({ x: p.x - half, y: p.y - half })
    expanded.push({ x: p.x - half, y: p.y + half })
    expanded.push({ x: p.x + half, y: p.y - half })
    expanded.push({ x: p.x + half, y: p.y + half })
  }

  // Compute the convex hull of all corners to wrap around the squares
  // Import locally to avoid type coupling
  return convexHull(expanded)
}