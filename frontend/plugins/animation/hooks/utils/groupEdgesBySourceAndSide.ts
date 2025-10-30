import { EdgeType } from "@context/types/EdgeType";
import { Side } from "./types";

export const groupEdgesBySourceAndSide = (edges: EdgeType[], idMap: Map<any, any>) => {
  const groupMap = new Map<string, { node: any; side: Side; edgeIndexes: number[] }>();

  edges.forEach((edge, idx) => {
    if (!edge.startSide || edge.sourceId === undefined) return;
    const key = `${edge.sourceId}-${edge.startSide}`;
    const node = idMap.get(edge.sourceId);
    if (!node) return;

    const group = groupMap.get(key);
    if (group) {
      group.edgeIndexes.push(idx);
    } else {
      groupMap.set(key, { node, side: edge.startSide as Side, edgeIndexes: [idx] });
    }
  });

  return groupMap;
};

export const groupEdgesByTargetAndSide = (edges: EdgeType[], idMap: Map<any, any>) => {
  const groupMap = new Map<string, { node: any; side: Side; edgeIndexes: number[] }>();

  edges.forEach((edge, idx) => {
    if (!edge.endSide || edge.targetId === undefined) return;
    const key = `${edge.targetId}-${edge.endSide}`;
    const node = idMap.get(edge.targetId);
    if (!node) return;

    const group = groupMap.get(key);
    if (group) {
      group.edgeIndexes.push(idx);
    } else {
      groupMap.set(key, { node, side: edge.endSide as Side, edgeIndexes: [idx] });
    }
  });

  return groupMap;
};

