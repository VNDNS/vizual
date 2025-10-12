import { Message, HandlerContext } from './types'
import { cloneComponents } from './cloneComponents'
import { findFlowChart } from './findFlowChart'

export const handleAssignImageToNode = (message: Message, context: HandlerContext) => {
  const flowChart = findFlowChart(context.components)
  if (!flowChart || !message.node) {
    return
  }
  const next = cloneComponents(context.components)
  const nextFlowChart = findFlowChart(next)
  if (!nextFlowChart) {
    return
  }
  const nodes = nextFlowChart.configuration.data.nodes
  const node = nodes.find((item: any) => item.name === message.node)
  if (!node) {
    return
  }
  node.image = message.image || ''
  context.setComponents(next)
}

