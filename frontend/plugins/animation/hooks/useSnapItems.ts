import { applyGridSnap } from "@context/components/arrangement/applyGridSnap";
import { useAnimation } from "@context/context";
import { useAnimationHooks } from "./useAnimationHooks";
import { useComputeEdges } from "./useComputeEdges";

export const useSnapItems = () => {
  const { selectedItems, components } = useAnimation();
  const { getNodes }                  = useAnimationHooks();
  const { computeEdges }              = useComputeEdges();

  const snapItems = () => {
    const nodes = getNodes();
    selectedItems.forEach((item: any) => {
      if (item.itemType === 'node') {
        const node = nodes?.find((node: any) => node.id === item.id);
        if (node) {
          const { dx, dy } = applyGridSnap(node.x, node.y);
          node.x = dx;
          node.y = dy;
        }
      }
      if (item.itemType === 'component') {
        const component = components.find((component: any) => component.id === item.id);
        if (component) {
          const { dx, dy } = applyGridSnap(component.configuration.x, component.configuration.y);
          component.configuration.x = dx;
          component.configuration.y = dy;
        }
      }
    });
    computeEdges(nodes);
  };

  return snapItems;
};
