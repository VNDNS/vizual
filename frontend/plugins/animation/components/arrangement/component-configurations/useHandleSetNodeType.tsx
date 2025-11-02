import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const useHandleSetNodeType = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode } = useAnimationHooks()

  return (type: string) => {
    const selectedNode = getSelectedNode()
    if (!selectedNode) return
    selectedNode.type = type
    setComponents([...components])
  }
}

