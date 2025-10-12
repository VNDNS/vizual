import { EdgeType } from "@context/types/EdgeType";

export const addStartAndEndPoints = (edge: EdgeType) => {
  edge.points = [{ x: edge.x1, y: edge.y1 }, ...(edge.points || []), { x: edge.x2, y: edge.y2 }];
};

