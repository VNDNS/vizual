import { Side } from "./types";
import { alignTolerance } from "./constants";

export const determineEdgeSides = (sourceNode: any, targetNode: any, existingSides?: { startSide?: Side; endSide?: Side }) => {
  let startSide = existingSides?.startSide || 'right';
  let endSide = existingSides?.endSide || 'left';

  const dx = targetNode.x - sourceNode.x;
  const dy = targetNode.y - sourceNode.y;

  if (Math.abs(dx) <= alignTolerance && Math.abs(dy) > alignTolerance) {
    if (dy < 0) {
      startSide = 'top';
      endSide = 'bottom';
    } else if (dy > 0) {
      startSide = 'bottom';
      endSide = 'top';
    }
  } else if (Math.abs(dy) <= alignTolerance && Math.abs(dx) > alignTolerance) {
    if (dx < 0) {
      startSide = 'left';
      endSide = 'right';
    } else if (dx > 0) {
      startSide = 'right';
      endSide = 'left';
    }
  }

  return { startSide, endSide };
};

