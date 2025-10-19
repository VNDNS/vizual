import { useAnimation } from "@context/context";
import { useAnimationHooks } from "@context/hooks/useAnimationHooks";

export const useUpdateSelection = () => {
  const { setSelectedNodes, setSelectedItems, components } = useAnimation();
  const { getSelectedComponent } = useAnimationHooks();
  
  const updateSelection = (p1: { x: number; y: number; }, p2: { x: number; y: number; }) => {
    const minX = Math.min(p1.x, p2.x);
    const minY = Math.min(p1.y, p2.y);
    const maxX = Math.max(p1.x, p2.x);
    const maxY = Math.max(p1.y, p2.y);

    const component = getSelectedComponent();
    const nodes = component?.configuration?.data?.nodes || [];
    const half = 0//nodeSize / 2;
    const components_ = components.map(component => ({id: component.id, x: component.configuration.x, y: component.configuration.y, type: component.type}))


    const selectedNodes_ = [...nodes, ...components_.filter((c: any) => c.type !== 'flowChart')]
      .filter((n: any) => n.x >= minX - half && n.x <= maxX + half && n.y >= minY - half && n.y <= maxY + half)
    
    const selectedIds = selectedNodes_.map((n: any) => n.id);
    
    const selectedItems_ = selectedNodes_.map((n: any) => {
      return ({id: n.id, x: n.x, y: n.y, componentId: n.componentId, itemType: n.componentId ? 'node' : 'component'})
    });
    
    setSelectedNodes(selectedIds);
    setSelectedItems(selectedItems_);
  };
  return updateSelection;
};
