import { useAnimation } from "@context/context";

export const useHandleNodeMouseDown = (id: number) => {
  const { setDraggingElement, setSelectedNode, setSelectedItems, selectedItems, setSelectedComponent, components } = useAnimation();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedNode(id);
    const flowChart = components.find((component: any) => component.type === 'flowChart');
    if(flowChart) {
      setSelectedComponent(flowChart?.id);
    }

    setDraggingElement("node");
    if(selectedItems.length <= 1) {
      setSelectedItems([{ id, x: 0, y: 0, itemType: 'node' }]);
    } 
  };

  return handleMouseDown;
};
