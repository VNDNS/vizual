import { nodeSize } from "../../constants";
import { Side } from "./types";
import { edgeOffset } from "./constants";

export const getAnchorPoint = (node: any, side?: Side) => {
  const width = node.width || nodeSize;
  const height = node.height || nodeSize;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  switch (side) {
    case 'top':
      return { x: node.x, y: node.y - halfHeight - edgeOffset };
    case 'bottom':
      return { x: node.x, y: node.y + halfHeight + edgeOffset };
    case 'left':
      return { x: node.x - halfWidth - edgeOffset, y: node.y };
    case 'right':
      return { x: node.x + halfWidth + edgeOffset, y: node.y };
    default:
      return { x: node.x, y: node.y };
  }
};

