import { nodeSize } from "../../constants";
import { Side } from "./types";
import { edgeOffset } from "./constants";

export const getDistributedPointOnSide = (node: any, side: Side, index: number, total: number) => {
  const width = node.width || nodeSize;
  const height = node.height || nodeSize;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  switch (side) {
    case 'top': {
      const step = width / (total + 1);
      const x = node.x - halfWidth + step * (index + 1);
      const y = node.y - halfHeight - edgeOffset;
      return { x, y };
    }
    case 'bottom': {
      const step = width / (total + 1);
      const x = node.x - halfWidth + step * (index + 1);
      const y = node.y + halfHeight + edgeOffset;
      return { x, y };
    }
    case 'left': {
      const step = height / (total + 1);
      const x = node.x - halfWidth - edgeOffset;
      const y = node.y - halfHeight + step * (index + 1);
      return { x, y };
    }
    case 'right': {
      const step = height / (total + 1);
      const x = node.x + halfWidth + edgeOffset;
      const y = node.y - halfHeight + step * (index + 1);
      return { x, y };
    }
  }
};

