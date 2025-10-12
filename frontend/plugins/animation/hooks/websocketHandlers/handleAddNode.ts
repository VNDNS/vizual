import { arrangeHorizontally } from '@context/functions/arrangeHorizontally'
import { Message, HandlerContext } from './types'
import { cloneComponents } from './cloneComponents'
import { findFlowChart } from './findFlowChart'
import { ensureParentLink } from './ensureParentLink'

export const handleAddNode = (message: Message, context: HandlerContext) => {
  if (!message.node) {
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
  nodes.push({ ...message.node, componentId: nextFlowChart.id })
  arrangeHorizontally(nodes)
  ensureParentLink(nodes, message.node)
  context.setComponents(next)
  context.computeEdges()
}

