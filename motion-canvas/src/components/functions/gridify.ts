import { convexHull, Point } from "./convexHull"

/* 
This function takes a set of points defining a convex shape and a grid size.
The set of points describes a convex shape.
The grid size defines a grid.
This function reprodcues the convex shape but each point has to lie on the grid and two adjacent point have to lie on the the same cell.
*/

export const gridify = (points: Point[], gridSize: number) => {
  if (!points || points.length === 0) return []
  if (!isFinite(gridSize) || gridSize <= 0) return convexHull(points)

  const hull = points//convexHull(points)
  if (hull.length === 0) return []

  const toGrid = (p: Point) => ({
    i: Math.round(p.x / gridSize),
    j: Math.round(p.y / gridSize),
  })

  const gridVertices = hull.map(toGrid)

  const compact: { i: number; j: number }[] = []
  for (const g of gridVertices) {
    const last = compact[compact.length - 1]
    if (!last || last.i !== g.i || last.j !== g.j) compact.push(g)
  }
  if (compact.length === 0) return []

  const result: Point[] = []
  const pushPoint = (i: number, j: number) => {
    const x = i * gridSize
    const y = j * gridSize
    const last = result[result.length - 1]
    if (!last || last.x !== x || last.y !== y) {
      result.push({ x, y })
    }
  }

  pushPoint(compact[0].i, compact[0].j)
  const n = compact.length
  for (let k = 0; k < n; k++) {
    let { i, j } = compact[k]
    const end = compact[(k + 1) % n]
    while (i !== end.i || j !== end.j) {
      const di = end.i - i
      const dj = end.j - j
      const stepI = di === 0 ? 0 : di > 0 ? 1 : -1
      const stepJ = dj === 0 ? 0 : dj > 0 ? 1 : -1
      i += stepI
      j += stepJ
      pushPoint(i, j)
    }
  }

  if (
    result.length > 1 &&
    result[0].x === result[result.length - 1].x &&
    result[0].y === result[result.length - 1].y
  ) {
    result.pop()
  }

  return result
}