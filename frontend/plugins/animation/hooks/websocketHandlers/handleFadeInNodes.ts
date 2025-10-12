import { FlowChartNode } from '@type/FlowChartTypes'
import { id } from '../../../../../common/id'
import { Message, HandlerContext } from './types'
import { findFlowChart } from './findFlowChart'

export const handleFadeInNodes = (message: Message, context: HandlerContext) => {
  const flowChart = findFlowChart(context.components)
  if (!flowChart || !Array.isArray(message.nodeNames)) {
    return
  }
  context.setAnimation(previous => {
    const nodes = flowChart.configuration.data.nodes.filter((node: any) => message.nodeNames?.includes(node.name))
    if (nodes.length === 0) {
      return previous
    }
    const duration = (nodes.length - 1) * 0.3 + 109 / 60
    const last = previous.at(-1)
    const start = (last?.start ?? 0) + (last?.duration ?? 0)
    const next = {
      component: flowChart.name || '',
      method: 'fadeIn',
      duration,
      start,
      inputs: { nodes: nodes.map((node: FlowChartNode) => node.name) },
      track: 0,
      id: id()
    }
    return [...previous, next]
  })
}

