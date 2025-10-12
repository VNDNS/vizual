import { EdgeType } from "@context/types/EdgeType";
import { Side } from "./types";
import { getDistributedPointOnSide } from "./getDistributedPointOnSide";

export const distributeEdgesOnSameSide = (edges: EdgeType[], groupMap: Map<string, { node: any; side: Side; edgeIndexes: number[] }>) => {
  
  const newEdges = edges.map(edge => ({ ...edge }));
  groupMap.forEach(({ node, side, edgeIndexes }) => {
    const total = edgeIndexes.length;
    if (total <= 1) return;

    edgeIndexes.forEach((edgeIdx, i) => {
      const p = getDistributedPointOnSide(node, side, i, total);
      newEdges[edgeIdx].x1 = p.x;
      newEdges[edgeIdx].y1 = p.y;
    });
  });

  return newEdges;
};

