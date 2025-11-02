import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { id } from "../../../../../../common/id"

export const useHandleAddInfo = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedNode } = useAnimationHooks()

  return () => {
    const selectedNode = getSelectedNode()
    if (!selectedNode) return

    if (!selectedNode.infos) {
      selectedNode.infos = []
    }
    const infos = selectedNode.infos
    infos.push({ name: 'Info ' + infos.length, id: id() })
    setComponents([...components])
  }
}

