import { Point } from "./Point";

/*
This function performs an offset operation on a polygon.
It returns a new polygon that is offset by the given offset.
*/

export const offsetPolygon = (polygon: Point[], offset: number) => {
  const n = polygon?.length || 0
  if (n < 3 || !isFinite(offset)) return polygon ? polygon.slice() : []

  const signedArea = () => {
    let a = 0
    for (let i = 0; i < n; i++) {
      const p = polygon[i]
      const q = polygon[(i + 1) % n]
      a += p.x * q.y - p.y * q.x
    }
    return a / 2
  }

  const ccw = signedArea() > 0

  const nx: number[] = new Array(n)
  const ny: number[] = new Array(n)
  const c: number[] = new Array(n)
  const valid: boolean[] = new Array(n)

  for (let i = 0; i < n; i++) {
    const a = polygon[i]
    const b = polygon[(i + 1) % n]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy)
    if (len === 0) {
      nx[i] = 0
      ny[i] = 0
      c[i] = 0
      valid[i] = false
      continue
    }
    const rx = dy / len
    const ry = -dx / len
    const lx = -dy / len
    const ly = dx / len
    const ox = ccw ? rx : lx
    const oy = ccw ? ry : ly
    nx[i] = ox
    ny[i] = oy
    c[i] = ox * a.x + oy * a.y + offset
    valid[i] = true
  }

  const prevValid = (i: number) => {
    let j = (i - 1 + n) % n
    for (let k = 0; k < n; k++) {
      if (valid[j]) return j
      j = (j - 1 + n) % n
    }
    return -1
  }

  const projectToLine = (px: number, py: number, i: number) => {
    const di = c[i] - (nx[i] * px + ny[i] * py)
    return { x: px + nx[i] * di, y: py + ny[i] * di }
  }

  const result: Point[] = []
  for (let i = 0; i < n; i++) {
    const i0 = prevValid(i)
    const i1 = valid[i] ? i : -1
    const p = polygon[i]
    if (i0 === -1 || i1 === -1) {
      result.push({ x: p.x, y: p.y })
      continue
    }
    const a1 = nx[i0]
    const b1 = ny[i0]
    const d1 = c[i0]
    const a2 = nx[i1]
    const b2 = ny[i1]
    const d2 = c[i1]
    const det = a1 * b2 - b1 * a2
    if (Math.abs(det) > 1e-10) {
      const x = (d1 * b2 - b1 * d2) / det
      const y = (a1 * d2 - d1 * a2) / det
      result.push({ x, y })
    } else {
      const p1 = projectToLine(p.x, p.y, i0)
      const p2 = projectToLine(p.x, p.y, i1)
      result.push({ x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 })
    }
  }

  const out: Point[] = []
  for (let i = 0; i < result.length; i++) {
    const a = result[i]
    const b = result[(i + result.length - 1) % result.length]
    if (out.length === 0 || Math.hypot(a.x - b.x, a.y - b.y) > 1e-9) out.push(a)
  }
  if (out.length > 1) {
    const first = out[0]
    const last = out[out.length - 1]
    if (Math.hypot(first.x - last.x, first.y - last.y) <= 1e-9) out.pop()
  }
  return out
}