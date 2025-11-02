import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const useHandleSetNodeColor = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode } = useAnimationHooks()

  return (color: string) => {
    const selectedNode = getSelectedNode()
    if (!selectedNode) return
    selectedNode.color = color
    setComponents([...components])
  }
}

