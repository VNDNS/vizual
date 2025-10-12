import { useAnimation } from "../../context"
import { ComponentUI } from "../../../../../types/ComponentUI"

export const useSelectors = () => {
  const { components, selectedComponent, selectedNode, selectedNodes } = useAnimation()

  const getSelectedComponent = () => {
    return components.find((component: ComponentUI) => component.id === selectedComponent);
  }

  const getSelectedNode = () => {
    const component = getSelectedComponent()
    return component?.configuration.data.nodes?.find((node: any) => node.id === selectedNode);
  }

  const getSelectedNodes = () => {
    const nodesIDs = selectedNodes
    const component = getSelectedComponent()
    return component?.configuration.data.nodes?.filter((node: any) => nodesIDs?.includes(node.id));
  }

  const getNodes = () => {
    const component = getSelectedComponent()
    return component?.configuration.data.nodes;
  }

  return { getSelectedComponent, getSelectedNode, getSelectedNodes, getNodes }
}

