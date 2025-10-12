import { useAnimation } from "../context";
import { useAnimationHooks } from "./useAnimationHooks";
import { useComputeEdges } from "@context/hooks/useComputeEdges";
import { useComputed } from "./useComputed";

export const useDragNodes = () => {
  const { selectedItems} = useAnimation();
  const { getNodes } = useAnimationHooks();
  const { draggingDeltaScreen } = useComputed();
  const { computeEdges } = useComputeEdges();

  const dragNodes = () => {
      const nodes = getNodes();
      nodes.forEach((node: any) => {
        if (selectedItems.map((item: any) => item.id).includes(node.id)) {
          const x = node.x + draggingDeltaScreen.x;
          const y = node.y + draggingDeltaScreen.y;
          node.x = x;
          node.y = y;
        }
      });
    computeEdges(nodes);
  }

  return dragNodes;
};


