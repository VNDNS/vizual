import { Point } from "./Point";

export const hullify = (points: Point[]) => {
  if (!points || points.length === 0) return [];

  const xs = Array.from(new Set(points.map(p => p.x))).sort((a, b) => a - b);
  const ys = Array.from(new Set(points.map(p => p.y))).sort((a, b) => a - b);
  const minDelta = (vals: number[]) => {
    let d = Infinity;
    for (let i = 1; i < vals.length; i++) {
      const diff = Math.abs(vals[i] - vals[i - 1]);
      if (diff > 0 && diff < d) d = diff;
    }
    return d;
  };
  const gridSize = Math.min(minDelta(xs), minDelta(ys));
  if (!isFinite(gridSize) || gridSize === 0) return [];

  const toCell = (p: Point) => ({ i: Math.floor(p.x / gridSize), j: Math.floor(p.y / gridSize) });
  const cellKey = (i: number, j: number) => `${i},${j}`;
  const vKey = (x: number, y: number) => `${x},${y}`;

  const filled = new Set<string>();
  for (const p of points) {
    const { i, j } = toCell(p);
    filled.add(cellKey(i, j));
  }
  if (filled.size === 0) return [];

  const hasCell = (i: number, j: number) => filled.has(cellKey(i, j));

  type Vertex = { x: number; y: number; };
  type Edge = { a: Vertex; b: Vertex; };

  const edges: Edge[] = [];
  for (const key of filled) {
    const [i, j] = key.split(',').map(Number);
    if (!hasCell(i - 1, j)) {
      edges.push({ a: { x: i, y: j }, b: { x: i, y: j + 1 } });
    }
    if (!hasCell(i, j + 1)) {
      edges.push({ a: { x: i, y: j + 1 }, b: { x: i + 1, y: j + 1 } });
    }
    if (!hasCell(i + 1, j)) {
      edges.push({ a: { x: i + 1, y: j + 1 }, b: { x: i + 1, y: j } });
    }
    if (!hasCell(i, j - 1)) {
      edges.push({ a: { x: i + 1, y: j }, b: { x: i, y: j } });
    }
  }
  if (edges.length === 0) return [];

  const dirIndex = (a: Vertex, b: Vertex) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (dx === 1 && dy === 0) return 0; // east
    if (dx === 0 && dy === 1) return 1; // north
    if (dx === -1 && dy === 0) return 2; // west
    if (dx === 0 && dy === -1) return 3; // south
    return -1;
  };

  const outMap = new Map<string, Map<number, Vertex>>();
  for (const e of edges) {
    const k = vKey(e.a.x, e.a.y);
    if (!outMap.has(k)) outMap.set(k, new Map<number, Vertex>());
    const d = dirIndex(e.a, e.b);
    if (d >= 0) outMap.get(k)!.set(d, e.b);
  }

  const start = edges
    .map(e => e.a)
    .reduce((best, v) => (best ? (v.y === best.y ? (v.x < best.x ? v : best) : (v.y < best.y ? v : best)) : v), null as Vertex | null)!;

  const startKey = vKey(start.x, start.y);
  const startOut = outMap.get(startKey) || new Map<number, Vertex>();
  let initDir = 0;
  if (startOut.has(0)) initDir = 0;
  else if (startOut.has(1)) initDir = 1;
  else if (startOut.has(2)) initDir = 2;
  else if (startOut.has(3)) initDir = 3;

  const visited = new Set<string>();
  const eKey = (a: Vertex, b: Vertex) => `${a.x},${a.y}->${b.x},${b.y}`;

  const boundary: Vertex[] = [];
  let current: Vertex = start;
  let prevDir = (initDir + 3) % 4; // pretend we came from opposite of left so first choice prefers left to start
  let first = true;

  while (true) {
    boundary.push(current);
    const key = vKey(current.x, current.y);
    const outs = outMap.get(key) || new Map<number, Vertex>();
    const tryDirs = [(prevDir + 1) % 4, prevDir, (prevDir + 3) % 4, (prevDir + 2) % 4];
    let moved = false;
    for (const nd of tryDirs) {
      const nxt = outs.get(nd);
      if (!nxt) continue;
      const ek = eKey(current, nxt);
      if (visited.has(ek)) continue;
      visited.add(ek);
      prevDir = nd;
      current = nxt;
      moved = true;
      break;
    }
    if (!moved) break;
    if (!first && current.x === start.x && current.y === start.y && prevDir === initDir) break;
    first = false;
    if (boundary.length > edges.length * 4) break;
  }

  if (boundary.length < 2) return [];

  const scale = gridSize;
  const world: Point[] = boundary.map(v => ({ x: v.x * scale, y: v.y * scale }));

  const signedArea = () => {
    let a = 0;
    for (let i = 0, n = world.length; i < n; i++) {
      const p = world[i];
      const q = world[(i + 1) % n];
      a += p.x * q.y - p.y * q.x;
    }
    return a / 2;
  };
  const areaSign = Math.sign(signedArea()) || 1;

  const out: Point[] = [];
  const m = world.length;
  if (m === 0) return out;

  out.push(world[0]);
  for (let i = 0; i < m; i++) {
    const a = out[out.length - 1];
    const b = world[(i + 1) % m];
    const c = world[(i + 2) % m];
    const u = { x: b.x - a.x, y: b.y - a.y };
    const v = { x: c.x - b.x, y: c.y - b.y };
    const straight = (Math.sign(u.x) === Math.sign(v.x) && Math.sign(u.y) === Math.sign(v.y));
    const cross = u.x * v.y - u.y * v.x;
    const isConvexTurn = areaSign * cross > 0;
    if (straight) {
      out.push(b);
    } else if (isConvexTurn) {
      out.push(c);
      i += 1;
    } else {
      out.push(b);
    }
  }

  if (out.length > 1) {
    const firstP = out[0];
    const lastP = out[out.length - 1];
    if (firstP.x === lastP.x && firstP.y === lastP.y) out.pop();
  }

  // remove consecutive duplicates
  const final: Point[] = [];
  for (const p of out) {
    const last = final[final.length - 1];
    if (!last || last.x !== p.x || last.y !== p.y) final.push(p);
  }

  // remove first and last point
  final.pop();
  final.shift();

  return final;
};
