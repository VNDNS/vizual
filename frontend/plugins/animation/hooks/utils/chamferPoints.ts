import { EdgeType } from "@context/types/EdgeType";
import { c1 } from "./constants";

export const chamferPoints = (edges: EdgeType[]) => {
  const newEdges = edges.map(edge => ({ ...edge }));
  newEdges.forEach((edge) => {
    const pts = edge.points || [];
    if (pts.length < 3) return;

    const chamferSize = Math.max(0, edge.c1 ?? c1);
    const newPoints: { x: number; y: number }[] = [];

    newPoints.push(pts[0]);

    for (let i = 1; i < pts.length - 1; i++) {
      const p0 = pts[i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];

      const v01x = p1.x - p0.x;
      const v01y = p1.y - p0.y;
      const v12x = p2.x - p1.x;
      const v12y = p2.y - p1.y;

      const len01 = Math.hypot(v01x, v01y);
      const len12 = Math.hypot(v12x, v12y);
      if (len01 === 0 || len12 === 0) {
        newPoints.push(p1);
        continue;
      }

      const d01x = v01x / len01;
      const d01y = v01y / len01;
      const d12x = v12x / len12;
      const d12y = v12y / len12;

      const dot = d01x * d12x + d01y * d12y;
      if (Math.abs(dot) > 0.999) {
        newPoints.push(p1);
        continue;
      }

      const d = Math.min(chamferSize, len01 / 2, len12 / 2);
      const cutA = { x: p1.x - d01x * d, y: p1.y - d01y * d };
      const cutB = { x: p1.x + d12x * d, y: p1.y + d12y * d };

      newPoints.push(cutA);
      newPoints.push(cutB);
    }

    newPoints.push(pts[pts.length - 1]);
    edge.points = newPoints;
  });

  return newEdges;
};

