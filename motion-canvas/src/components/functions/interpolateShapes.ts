import { Point } from "./Point"

const getRelevantPoints = (pointsA: Point[], pointsB: Point[]) => {
  const serialize = (p: Point) => `${p.x}:${p.y}`
  const setB = new Set(pointsB.map(serialize))

  const n = pointsA.length
  if (n === 0) return []

  const keep = new Set<string>()
  for (let i = 0; i < n; i++) {
    const s = serialize(pointsA[i])
    if (!setB.has(s)) {
      keep.add(s)
      if (n > 1) {
        keep.add(serialize(pointsA[(i - 1 + n) % n]))
        keep.add(serialize(pointsA[(i + 1) % n]))
      }
    }
  }

  const result: Point[] = []
  let last: string | null = null
  for (let i = 0; i < n; i++) {
    const p = pointsA[i]
    const s = serialize(p)
    if (keep.has(s) && s !== last) {
      result.push(p)
      last = s
    }
  }

  return result
};

const getUniqueToB = (pointsA: Point[], pointsB: Point[]) => {
  const serialize = (p: Point) => `${p.x}:${p.y}`
  const setA = new Set(pointsA.map(serialize))
  return pointsB.filter((p) => !setA.has(serialize(p)))
}

export const getSharedPoints = (pointsA: Point[], pointsB: Point[]) => {
  const serialize = (p: Point) => `${p.x}:${p.y}`
  const setA = new Set(pointsA.map(serialize))
  return pointsB.filter((p) => setA.has(serialize(p)))
}

const clonePoint = (p: Point): Point => ({ x: p.x, y: p.y })
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)
const isSamePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y
const dedupeConsecutive = (points: Point[]): Point[] => {
  if (points.length === 0) return []
  const out: Point[] = [clonePoint(points[0])]
  for (let i = 1; i < points.length; i++) {
    const prev = out[out.length - 1]
    const cur = points[i]
    if (!isSamePoint(prev, cur)) out.push(clonePoint(cur))
  }
  return out
}

const serialize = (p: Point) => `${p.x}:${p.y}`

const unifyPoints = (shared: Point[], inserted: Point[]) => {
  const positionOfStart = inserted[0]
  const positionOfEnd = inserted[inserted.length-1]
  const indexStart = shared.findIndex(point => serialize(point) === serialize(positionOfStart))

  // insert inserted into shared at indexStart
  const result = [...shared.slice(0, indexStart+1), ...inserted, ...shared.slice(indexStart+1)]
  return result
}

const expandPolyline = (points: Point[], targetCount: number): Point[] => {
  const m = points.length
  if (m === 0) return []
  if (m === 1) return Array.from({ length: targetCount }, () => clonePoint(points[0]))
  if (m === targetCount) return points.map(clonePoint)
  if (m > targetCount) {
    const reduced: Point[] = []
    for (let i = 0; i < targetCount; i++) {
      const idx = Math.round((i * (m - 1)) / (targetCount - 1))
      reduced.push(clonePoint(points[idx]))
    }
    return reduced
  }

  const additional = targetCount - m
  const segLens: number[] = []
  for (let i = 0; i < m - 1; i++) segLens.push(distance(points[i], points[i + 1]))
  const totalLen = segLens.reduce((s, v) => s + v, 0)

  if (totalLen === 0) return Array.from({ length: targetCount }, () => clonePoint(points[0]))

  const quotas = segLens.map(l => (l / totalLen) * additional)
  const base = quotas.map(q => Math.floor(q))
  let assigned = base.reduce((s, v) => s + v, 0)
  const remaining = additional - assigned
  const order = quotas
    .map((q, i) => ({ i, frac: q - Math.floor(q) }))
    .sort((a, b) => b.frac - a.frac)
  for (let k = 0; k < remaining; k++) base[order[k].i]++

  const expanded: Point[] = []
  for (let i = 0; i < m - 1; i++) {
    const a = points[i]
    const b = points[i + 1]
    if (expanded.length === 0) expanded.push(clonePoint(a))
    const inserts = base[i]
    for (let j = 1; j <= inserts; j++) {
      const t = j / (inserts + 1)
      expanded.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })
    }
    if (!isSamePoint(expanded[expanded.length - 1], b)) {
      expanded.push(clonePoint(b))
    }
  }
  return expanded
}

export const interpolateShapes = (oldPoints: Point[], newPoints: Point[]) => {
  const startingPoints = getRelevantPoints(oldPoints, newPoints)
  const endingPoints = getUniqueToB(oldPoints, newPoints)
  const sharedPoints = getSharedPoints(newPoints, oldPoints)

  const result: Point[][] = []

  if (!startingPoints || !endingPoints || startingPoints.length === 0 || endingPoints.length === 0) {
    return {result, adjustedStart: startingPoints, endingPoints}
  }

  const startingNoDup = dedupeConsecutive(startingPoints)
  const adjustedStart = expandPolyline(startingNoDup, endingPoints.length)


  for (let i = 0; i < endingPoints.length; i++) {
    const s = adjustedStart[i]
    const e = endingPoints[i]
    result.push([clonePoint(s), clonePoint(e)])
  }

  const unionPoints = unifyPoints(sharedPoints, adjustedStart)

  return {result, adjustedStart, endingPoints, unionPoints}
}