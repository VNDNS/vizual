import { useAnimation } from "@context/context";
import { useAnimationHooks } from "./useAnimationHooks";
import { useComputed } from "./useComputed";
import { useComputeEdges } from "./useComputeEdges";


export const useDragItems = () => {
  const { selectedItems, components, setComponents } = useAnimation();
  const { getNodes } = useAnimationHooks();
  const { draggingDeltaScreen } = useComputed();
  const { computeEdges } = useComputeEdges();
  const nodes = getNodes();

  const dragitems = () => {
    selectedItems.forEach((item: any) => {
      if (item.itemType === 'component') {
        const component = components.find((component: any) => component.id === item.id);
        if (component) {
          const x = component.configuration.x + draggingDeltaScreen.x/2;
          const y = component.configuration.y + draggingDeltaScreen.y/2;
          component.configuration.x = x;
          component.configuration.y = y;
        }
      }
      if (item.itemType === 'node') {
        const node = nodes?.find((node: any) => node.id === item.id);
        if (node) {
          const x = node.x + draggingDeltaScreen.x;
          const y = node.y + draggingDeltaScreen.y;
          node.x = x;
          node.y = y;
        }
      }
    });
    setComponents([...components])
    computeEdges()
  };

  return dragitems;
};
