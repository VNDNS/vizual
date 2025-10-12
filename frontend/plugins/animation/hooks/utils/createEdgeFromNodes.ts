import { EdgeType } from "@context/types/EdgeType";
import { determineEdgeSides } from "./determineEdgeSides";
import { getAnchorPoint } from "./getAnchorPoint";

export const createEdgeFromNodes = (sourceNode: any, targetNode: any, existingEdge: any) => {
  const edgeId = `${sourceNode.id}-${targetNode.id}`;
  const { startSide, endSide } = determineEdgeSides(sourceNode, targetNode, {
    startSide: existingEdge?.startSide,
    endSide: existingEdge?.endSide,
  });

  const start = getAnchorPoint(sourceNode, startSide);
  const end = getAnchorPoint(targetNode, endSide);

  return {
    id: edgeId,
    x1: start.x,
    y1: start.y,
    x2: end.x,
    y2: end.y,
    sourceId: sourceNode.id,
    targetId: targetNode.id,
    endSide,
    startSide,
    c0: existingEdge?.c0 ?? 0.5,
    c1: existingEdge?.c1 ?? 500,
  } as EdgeType;
};

