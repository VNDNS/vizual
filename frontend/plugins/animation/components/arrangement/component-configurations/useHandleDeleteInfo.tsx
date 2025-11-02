import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const useHandleDeleteInfo = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode } = useAnimationHooks()

  return (id: string, setSelectedInfo: (id: string) => void) => {
    const selectedNode = getSelectedNode()
    if (!selectedNode?.infos) return

    selectedNode.infos = selectedNode.infos.filter((info: any) => info.id !== id)
    setComponents([...components])
    setSelectedInfo('')
  }
}

