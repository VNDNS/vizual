import { useAnimation } from "@context/context";
import { useHandlePan } from "@context/hooks/animation-utils/usePanInteraction";

export const useHandleScreenMouseDown = () => {
  const { setSelectedNodes, setSelectedNode, setDraggingElement, setSelectedItems } = useAnimation();
  const { handlePan } = useHandlePan();

  const handleScreenMouseDown = (e: React.MouseEvent) => {
    setSelectedNodes([]);
    setSelectedNode(null);
    setDraggingElement("screen");
    setSelectedItems([]);
    handlePan(e);
  };
  return handleScreenMouseDown;
};
