import { convexHull } from "./convexHull";
import { Point } from "./Point";

/* 
This function merges two shapes by merging their vertices.
The two shapes are adjacent voronoi cells.
It returns a new shape that is the union of the two shapes.
The points have the correct order.
*/


export const mergeCells = (shapeA: Point[], shapeB: Point[]) => {
  const eps = 1e-6
  const equals = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y) < eps
  const indexOfPoint = (arr: Point[], p: Point) => arr.findIndex(q => equals(p, q))
  const sliceCyclic = (poly: Point[], from: number, to: number) => {
    const n = poly.length
    const out: Point[] = []
    if (n === 0) return out
    let i = from
    out.push(poly[i])
    while (i !== to) {
      i = (i + 1) % n
      out.push(poly[i])
    }
    return out
  }
  const uniquePush = (arr: Point[], p: Point) => {
    if (!arr.some(q => equals(p, q))) arr.push(p)
  }

  const common: Point[] = []
  console.log(shapeA)
  for (const pa of shapeA) {
    if (shapeB.some(pb => equals(pa, pb))) uniquePush(common, pa)
  }

  if (common.length >= 2) {
    const dist2 = (p: Point, q: Point) => (p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y)
    let p = common[0]
    let q = common[1]
    if (common.length > 2) {
      let maxD = -1
      for (let i = 0; i < common.length; i++) {
        for (let j = i + 1; j < common.length; j++) {
          const d = dist2(common[i], common[j])
          if (d > maxD) {
            maxD = d
            p = common[i]
            q = common[j]
          }
        }
      }
    }

    const iAp = indexOfPoint(shapeA, p)
    const iAq = indexOfPoint(shapeA, q)
    const iBp = indexOfPoint(shapeB, p)
    const iBq = indexOfPoint(shapeB, q)

    if (iAp === -1 || iAq === -1 || iBp === -1 || iBq === -1) {
      const all = [...shapeA, ...shapeB]
      const uniq: Point[] = []
      for (const pt of all) uniquePush(uniq, pt)
      return convexHull(uniq)
    }

    const pathA1 = sliceCyclic(shapeA, iAp, iAq)
    const pathA2 = sliceCyclic(shapeA, iAq, iAp)
    const extA = pathA1.length > pathA2.length ? pathA1 : pathA2

    const pathB1 = sliceCyclic(shapeB, iBq, iBp)
    const pathB2 = sliceCyclic(shapeB, iBp, iBq)
    const extB = pathB1.length > pathB2.length ? pathB1 : pathB2

    const merged = [...extA.slice(0, -1), ...extB.slice(0, -1)]
    const out: Point[] = []
    for (const pt of merged) {
      if (out.length === 0 || !equals(out[out.length - 1], pt)) out.push(pt)
    }
    if (out.length > 1 && equals(out[0], out[out.length - 1])) out.pop()
    return out
  }

  const all = [...shapeA, ...shapeB]
  const uniq: Point[] = []
  for (const pt of all) uniquePush(uniq, pt)
  return convexHull(uniq)
}