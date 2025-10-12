import { id } from '../../../../../common/id'
import { Message, HandlerContext } from './types'
import { findFlowChart } from './findFlowChart'
import { computeFrameBounds } from './computeFrameBounds'

export const handleFocusOnSelection = (message: Message, context: HandlerContext) => {
  const flowChart = findFlowChart(context.components)
  if (!flowChart || !Array.isArray(message.nodes)) {
    return
  }
  const nodes = flowChart.configuration.data.nodes.filter((node: any) => message.nodes?.includes(node.name))
  if (nodes.length === 0) {
    return
  }
  const { centerX, centerY, zoom } = computeFrameBounds(nodes)
  context.setAnimation(previous => {
    const last = previous.at(-1)
    const start = (last?.start || 0) + (last?.duration || 0)
    const next = {
      component: 'camera',
      method: 'to',
      duration: 1,
      start,
      inputs: { x: centerX, y: centerY, zoom: 1 / zoom },
      track: 0,
      id: id()
    }
    return [...previous, next]
  })
}

