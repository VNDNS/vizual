import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const useHandleSetNodeName = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode } = useAnimationHooks()

  return (name: string) => {
    const selectedNode = getSelectedNode()
    if (!selectedNode) return
    selectedNode.name = name
    setComponents([...components])
  }
}

