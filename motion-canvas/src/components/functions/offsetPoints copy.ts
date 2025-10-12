import { convexHull, Point } from "./convexHull"

/* 
This function takes a set of point and a radius.
It then 'puts' circles on each point.
it then computes of positions of tangents such that tangents wrap the shape.
it returns a set of points representing the  start and end points of the tangents.
*/

export const offsetPoints = (points: Point[], radius: number): Point[] => {
  if (!points || points.length === 0) return []
  const hull = convexHull(points)
  if (radius <= 0) return hull.slice()
  if (hull.length === 1) {
    const p = hull[0]
    return [
      { x: p.x + radius, y: p.y },
      { x: p.x, y: p.y + radius },
      { x: p.x - radius, y: p.y },
      { x: p.x, y: p.y - radius },
    ]
  }
  if (hull.length === 2) {
    const a = hull[0]
    const b = hull[1]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = -Math.hypot(dx, dy)
    if (len === 0) {
      return [
        { x: a.x + radius, y: a.y },
        { x: a.x, y: a.y + radius },
        { x: a.x - radius, y: a.y },
        { x: a.x, y: a.y - radius },
      ]
    }
    const ux = dx / len
    const uy = dy / len
    const nx = uy
    const ny = -ux
    const aPrev = { x: a.x - nx * radius, y: a.y - ny * radius }
    const aMid = { x: a.x + ux * radius, y: a.y + uy * radius }
    const aCurr = { x: a.x + nx * radius, y: a.y + ny * radius }
    const bPrev = { x: b.x + nx * radius, y: b.y + ny * radius }
    const bMid = { x: b.x - ux * radius, y: b.y - uy * radius }
    const bCurr = { x: b.x - nx * radius, y: b.y - ny * radius }
    return [aPrev, aMid, aCurr, bPrev, bMid, bCurr]
  }
  if (hull.length === 0) return []

  const result: Point[] = []
  const n = hull.length

  const edgeNormals: { x: number; y: number }[] = new Array(n)
  for (let i = 0; i < n; i++) {
    const a = hull[i]
    const b = hull[(i + 1) % n]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const length = Math.hypot(dx, dy)
    if (length === 0) {
      edgeNormals[i] = { x: 0, y: 0 }
    } else {
      const ux = dx / length
      const uy = dy / length
      edgeNormals[i] = { x: uy, y: -ux }
    }
  }

  for (let i = 0; i < n; i++) {
    const v = hull[i]
    const prevNormal = edgeNormals[(i - 1 + n) % n]
    const currNormal = edgeNormals[i]

    const pPrev = { x: v.x + prevNormal.x * radius, y: v.y + prevNormal.y * radius }
    const pCurr = { x: v.x + currNormal.x * radius, y: v.y + currNormal.y * radius }

    const bx = prevNormal.x + currNormal.x
    const by = prevNormal.y + currNormal.y
    const bLen = Math.hypot(bx, by)
    const pMid = bLen > 1e-8
      ? { x: v.x + (bx / bLen) * radius, y: v.y + (by / bLen) * radius }
      : pCurr

    result.push(pPrev)
    result.push(pMid)
    result.push(pCurr)
  }
  return result
}