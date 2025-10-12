import { useSelectors } from "./animation-utils/useSelectors"
import { useExport } from "./animation-utils/useExport"
import { useDragInteractions } from "./animation-utils/useDragInteractions"
import { useBackgroundInteraction } from "./animation-utils/useBackgroundInteraction"

export const useAnimationHooks = () => {
  const { getSelectedComponent, getSelectedNode, getSelectedNodes, getNodes } = useSelectors()
  const { exportToCurrentData } = useExport()
  const { handleDragNode, handleDragCamera, handleDragComponent } = useDragInteractions()
  const { handleBackgroundClick } = useBackgroundInteraction()

  return { 
    getSelectedComponent, 
    getSelectedNode, 
    getSelectedNodes,
    getNodes,
    exportToCurrentData, 
    handleDragNode,
    handleDragComponent,
    handleDragCamera,
    handleBackgroundClick
  };
}
