import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { removeNodeFromParents } from "./removeNodeFromParents"

export const useHandleDeleteNode = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode, getNodes } = useAnimationHooks()

  return () => {
    const selectedNode = getSelectedNode()
    if (!selectedNode) return

    const nodes = getNodes()
    removeNodeFromParents(selectedNode, nodes)
    
    const nodeIndex = nodes.indexOf(selectedNode)
    if (nodeIndex !== -1) {
      nodes.splice(nodeIndex, 1)
      setComponents([...components])
    }
  }
}

