import { arrangeHorizontally } from '@context/functions/arrangeHorizontally'
import { Message, HandlerContext } from './types'
import { cloneComponents } from './cloneComponents'
import { findFlowChart } from './findFlowChart'
import { ensureParentLink } from './ensureParentLink'

export const handleAddNodes = (message: Message, context: HandlerContext) => {
  if (!Array.isArray(message.nodes)) {
    return
  }
  const flowChart = findFlowChart(context.components)
  if (!flowChart) {
    return
  }
  const next = cloneComponents(context.components)
  const nextFlowChart = findFlowChart(next)
  if (!nextFlowChart) {
    return
  }
  const nodes = nextFlowChart.configuration.data.nodes
  message.nodes.forEach(node => {
    nodes.push({ ...node, componentId: nextFlowChart.id })
    ensureParentLink(nodes, node)
  })
  arrangeHorizontally(nodes)
  context.setComponents(next)
  context.computeEdges()
}

