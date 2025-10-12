import { Point } from "./convexHull"

/*
This function takes a set of points and a grid size.
The points describe a polygon.
This function uses grid size to define a coordinate system.
Each grid cell has a coordinate. 
It then creates an array of points, which represent grid cell where either a point of the polygon lies, or where the connecting edge between two points goes throught.
The points are returned in the order of the grid cells.
*/

export const pixelate = (points: Point[], gridSize: number) => {
  if (!points || points.length === 0) return []
  if (!isFinite(gridSize) || gridSize <= 0) return []

  const toCell = (p: Point) => ({ i: Math.floor(p.x / gridSize), j: Math.floor(p.y / gridSize) })
  const toPoint = (i: number, j: number): Point => ({ x: i * gridSize, y: j * gridSize })

  const seen = new Set<string>()
  const result: Point[] = []
  const pushCell = (i: number, j: number) => {
    const key = `${i},${j}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push(toPoint(i, j))
    }
  }

  const n = points.length
  for (let k = 0; k < n; k++) {
    const a = points[k]
    const b = points[(k + 1) % n]

    let { i: i0, j: j0 } = toCell(a)
    const { i: i1, j: j1 } = toCell(b)
    pushCell(i0, j0)

    const dx = b.x - a.x
    const dy = b.y - a.y

    const stepI = dx === 0 ? 0 : dx > 0 ? 1 : -1
    const stepJ = dy === 0 ? 0 : dy > 0 ? 1 : -1

    let tMaxI: number
    let tMaxJ: number
    let tDeltaI: number
    let tDeltaJ: number

    if (stepI !== 0) {
      const nextBoundaryX = (i0 + (stepI > 0 ? 1 : 0)) * gridSize
      tMaxI = (nextBoundaryX - a.x) / dx
      tDeltaI = gridSize / Math.abs(dx)
    } else {
      tMaxI = Infinity
      tDeltaI = Infinity
    }

    if (stepJ !== 0) {
      const nextBoundaryY = (j0 + (stepJ > 0 ? 1 : 0)) * gridSize
      tMaxJ = (nextBoundaryY - a.y) / dy
      tDeltaJ = gridSize / Math.abs(dy)
    } else {
      tMaxJ = Infinity
      tDeltaJ = Infinity
    }

    while (i0 !== i1 || j0 !== j1) {
      if (tMaxI < tMaxJ) {
        i0 += stepI
        tMaxI += tDeltaI
      } else if (tMaxJ < tMaxI) {
        j0 += stepJ
        tMaxJ += tDeltaJ
      } else {
        i0 += stepI
        j0 += stepJ
        tMaxI += tDeltaI
        tMaxJ += tDeltaJ
      }
      pushCell(i0, j0)
    }
  }

  return result
}

