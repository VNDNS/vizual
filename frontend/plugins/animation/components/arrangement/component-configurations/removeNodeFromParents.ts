import { FlowChartNode } from "@type/FlowChartTypes"

export const removeNodeFromParents = (node: FlowChartNode, nodes: FlowChartNode[]) => {
  if (node.parent) {
    const parent = nodes.find((n: FlowChartNode) => n.id === node.parent)
    if (parent) {
      parent.children = parent.children.filter((child: number) => child !== node.id)
    }
  }
  if (Array.isArray(node.parents)) {
    node.parents.forEach((parentId: number) => {
      const parent = nodes.find((n: FlowChartNode) => n.id === parentId)
      if (parent) {
        parent.children = parent.children.filter((child: number) => child !== node.id)
      }
    })
  }
}

