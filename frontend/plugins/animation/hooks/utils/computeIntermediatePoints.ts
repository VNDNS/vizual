import { EdgeType } from "@context/types/EdgeType";
import { Side } from "./types";
import { axisOfSide } from "./axisOfSide";
import { c0 } from "./constants";

export const computeIntermediatePoints = (edge: EdgeType) => {
  if (!edge.startSide || !edge.endSide) return;

  const dx = edge.x2 - edge.x1;
  const dy = edge.y2 - edge.y1;

  if (dx === 0 || dy === 0) {
    return;
  }

  const startAxis = axisOfSide(edge.startSide as Side);
  const endAxis = axisOfSide(edge.endSide as Side);

  if (startAxis !== endAxis) {
    if (startAxis === 'h') {
      edge.points = [{ x: edge.x2, y: edge.y1 }];
    } else {
      edge.points = [{ x: edge.x1, y: edge.y2 }];
    }
    return;
  }

  const frac = edge.c0 ?? c0;
  let p1x = edge.x1, p1y = edge.y1;
  if (startAxis === 'h') {
    p1x = edge.x1 + Math.sign(dx) * Math.abs(dx) * frac;
  } else {
    p1y = edge.y1 + Math.sign(dy) * Math.abs(dy) * frac;
  }

  let p2x: number, p2y: number;
  if (endAxis === 'v') {
    p2x = edge.x2;
    p2y = p1y;
  } else {
    p2x = p1x;
    p2y = edge.y2;
  }

  edge.points = [
    { x: p1x, y: p1y },
    { x: p2x, y: p2y },
  ];
};

