import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { useSetPreviewAnimation } from "../../../../common/hooks/useSetPreviewAnimation"
import { FlowChartNode } from "@type/FlowChartTypes"
import { id } from "../../../../../../common/id"

export const useFadeInNodes = () => {
  const { setAnimation, animation } = useAnimation()
  const { getSelectedComponent, getSelectedNodes } = useAnimationHooks()
  const setPreviewAnimation = useSetPreviewAnimation()

  return () => {
    const selectedComponent = getSelectedComponent()
    const selectedNodes = getSelectedNodes()
    
    if (!selectedComponent) return

    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { 
      component: selectedComponent.name || '', 
      method: 'fadeIn', 
      duration: 1, 
      start: start, 
      inputs: { nodes: selectedNodes.map((node: FlowChartNode) => node.name) }, 
      track: 0, 
      id: id() 
    }
    const updatedAnimation = [...animation, newAnimation]
    setAnimation(updatedAnimation)
    setPreviewAnimation(updatedAnimation)
  }
}

