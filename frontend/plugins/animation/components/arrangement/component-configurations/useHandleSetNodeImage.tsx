import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const useHandleSetNodeImage = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode } = useAnimationHooks()

  return (image: string) => {
    const selectedNode = getSelectedNode()
    if (!selectedNode) return
    selectedNode.image = image
    setComponents([...components])
  }
}

