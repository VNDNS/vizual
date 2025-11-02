import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { useComputeEdges } from "@context/hooks/useComputeEdges"

export const useHandleSetNodeHeight = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode } = useAnimationHooks()
  const { computeEdges } = useComputeEdges()

  return (value: number) => {
    const selectedNode = getSelectedNode()
    if (!selectedNode) return
    selectedNode.height = value
    setComponents([...components])
    computeEdges()
  }
}

