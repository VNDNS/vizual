import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { useComputeEdges } from "@context/hooks/useComputeEdges"
import { calculateNewNodePosition } from "./calculateNewNodePosition"
import { createNewNode } from "./createNewNode"

export const useHandleAddNode = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode, getSelectedComponent, getNodes, getSelectedNodes } = useAnimationHooks()
  const { computeEdges } = useComputeEdges()

  return () => {
    const selectedNode = getSelectedNode()
    const selectedComponent = getSelectedComponent()
    const selectedNodes = getSelectedNodes()
    const nodes = getNodes()

    if (!selectedComponent) return

    const newNodeId = Math.floor(Math.random() * 1000000)
    const position = calculateNewNodePosition(selectedNode, selectedNodes)
    const newNode = createNewNode(newNodeId, position, nodes.length, selectedComponent.id, selectedNode, selectedNodes)

    const newNodes = [...nodes, newNode]
    selectedComponent.configuration.data.nodes = newNodes
    setComponents([...components])
    computeEdges()
  }
}

