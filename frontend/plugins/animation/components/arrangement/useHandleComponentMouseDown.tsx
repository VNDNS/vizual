import { useAnimation } from "@context/context";


export const useHandleComponentMouseDown = (id: string, itemType: string) => {
  const { setDraggingElement, setSelectedItems, selectedItems, setSelectedComponent } = useAnimation();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDraggingElement("node");
    setSelectedComponent(id);

    if (selectedItems.length <= 1) {
      setSelectedItems([{ id, x: 0, y: 0, itemType: itemType }]);
    }
  };

  return handleMouseDown;
};
