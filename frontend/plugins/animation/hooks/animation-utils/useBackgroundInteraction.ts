import { useAnimation } from "../../context"
import { useSelectors } from "./useSelectors"
import { copy } from "../../../../../common/copy"

export const useBackgroundInteraction = () => {
  const { 
    drawingBackground,
    origin,
    zoom,
    components,
    setSelectedNode,
    setSelectedEdge,
    setCameraIsSelected,
    setShowJointConfiguration,
    setSelectedJoint,
    setSelectedMethod,
    setSelectedNodes,
    setSelectedBackgroundNodes,
    setComponents
  } = useAnimation()
  const { getSelectedComponent } = useSelectors()

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (drawingBackground) {
      console.log(e.clientX, e)

      const rect = (e.target as HTMLElement).getBoundingClientRect()
      const offsetX = e.clientX - rect.left
      const offsetY = e.clientY - rect.top
      console.log(offsetX)

      const component = getSelectedComponent()
      const newComponents = copy(components)
      const index = newComponents.findIndex((c: any) => c.id === component?.id)
      if (!component) return;
      const points = component.configuration.data.points
      const newPoints = [...points, {x: (offsetX-origin.dx)/zoom, y: (offsetY-origin.dy)/zoom}]
      component.configuration.data.points = newPoints
      newComponents[index] = component
      setComponents(newComponents)
      return
    }
    else if (e.target instanceof SVGSVGElement) {
      setSelectedNode(null);
      setSelectedEdge(null);
      setCameraIsSelected(false);
      setShowJointConfiguration(false);
      setSelectedJoint(null);
      setSelectedMethod(null);
      setSelectedNodes([]);
      setSelectedBackgroundNodes([]);
    }
  };

  return { handleBackgroundClick }
}

