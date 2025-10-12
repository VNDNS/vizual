import { useAnimation } from "../context"
import { useAnimationHooks } from "./useAnimationHooks"
import { FlowChartConfiguration, FlowChartEdge, FlowChartNode } from "types/FlowChartTypes"
import { id } from "../../../../common/id"

export const useNodeAnimation = () => {
  const { setAnimation, animation } = useAnimation()
  const { getSelectedComponent, getSelectedNodes } = useAnimationHooks()

  const addAnimation = () => {
    const component = getSelectedComponent()
    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { component: component?.name || '', method: 'activateRoot', duration: 1, start: start, inputs: {}, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  const addHighlightAnimation = () => {
    const selectedNodes_ = getSelectedNodes()
    const nodeIds = selectedNodes_.map((node: FlowChartNode) => node.id)
    const edgeIDs: string[] = []
    const component = getSelectedComponent()
    const config = component?.configuration as FlowChartConfiguration | undefined
    selectedNodes_.forEach((node: FlowChartNode) => {
      (node.children || []).forEach((childID: number | string) => {
        const parentID = node.id
        const edge = config?.data.edges.find((e: FlowChartEdge) => e.sourceId === parentID && e.targetId === childID && nodeIds.includes(childID))
        if (edge) {
          edgeIDs.push(edge.id)
        }
      })
    })
    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { component: 'highlighter', method: 'highlight', duration: 1, start: start, inputs: {node: [...nodeIds, ...edgeIDs], component: 'flowChart'}, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  const addResetHighlightAnimation = () => {
    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { component: 'highlighter', method: 'reset', duration: 1, start: start, inputs: {}, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  const fadeInNodes = () => {
    const selectedNodes_ = getSelectedNodes()
    const selectedComponent_ = getSelectedComponent()
    const duration = (selectedNodes_.length-1) * .3 + 109/60
    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { component: selectedComponent_?.name || '', method: 'fadeIn', duration: duration, start: start, inputs: { nodes: selectedNodes_.map((node: FlowChartNode) => node.name) }, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  return {
    addAnimation,
    addHighlightAnimation,
    addResetHighlightAnimation,
    fadeInNodes
  }
}

