import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const useHandleSetInfoValue = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode } = useAnimationHooks()

  return (value: string, selectedInfo: string) => {
    const selectedNode = getSelectedNode()
    if (!selectedNode?.infos) return

    const index = selectedNode.infos.findIndex((info: any) => info.id === selectedInfo)
    if (index !== undefined && index !== -1) {
      selectedNode.infos[index].name = value
      setComponents([...components])
    }
  }
}

