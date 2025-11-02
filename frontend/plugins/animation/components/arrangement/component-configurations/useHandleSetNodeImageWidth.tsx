import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const useHandleSetNodeImageWidth = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode } = useAnimationHooks()

  return (value: number) => {
    const selectedNode = getSelectedNode()
    if (!selectedNode) return
    selectedNode.imageWidth = value
    setComponents([...components])
  }
}

