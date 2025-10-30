import { EdgeType } from "@context/types/EdgeType";
import { Side } from "./types";
import { getDistributedPointOnSide } from "./getDistributedPointOnSide";

export const distributeEdgesOnSameSide = (edges: EdgeType[], sourceGroupMap: Map<string, { node: any; side: Side; edgeIndexes: number[] }>, targetGroupMap?: Map<string, { node: any; side: Side; edgeIndexes: number[] }>) => {
  
  const newEdges = edges.map(edge => ({ ...edge }));
  
  sourceGroupMap.forEach(({ node, side, edgeIndexes }) => {
    const total = edgeIndexes.length;
    if (total <= 1) return;

    edgeIndexes.forEach((edgeIdx, i) => {
      const p = getDistributedPointOnSide(node, side, i, total);
      newEdges[edgeIdx].x1 = p.x;
      newEdges[edgeIdx].y1 = p.y;
    });
  });

  if (targetGroupMap) {
    targetGroupMap.forEach(({ node, side, edgeIndexes }) => {
      const total = edgeIndexes.length;
      if (total <= 1) return;

      edgeIndexes.forEach((edgeIdx, i) => {
        const p = getDistributedPointOnSide(node, side, i, total);
        newEdges[edgeIdx].x2 = p.x;
        newEdges[edgeIdx].y2 = p.y;
      });
    });
  }

  return newEdges;
};

