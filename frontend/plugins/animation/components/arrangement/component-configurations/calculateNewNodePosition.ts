import { FlowChartNode } from "@type/FlowChartTypes"

export const calculateNewNodePosition = (selectedNode: FlowChartNode | undefined, selectedNodes: FlowChartNode[]) => {
  if (selectedNodes.length > 1) {
    const avgX = selectedNodes.reduce((sum, n) => sum + (n.x ?? 0), 0) / selectedNodes.length
    const avgY = selectedNodes.reduce((sum, n) => sum + (n.y ?? 0), 0) / selectedNodes.length
    return { x: avgX + 300, y: avgY }
  }
  return { x: (selectedNode?.x ?? 0) + 300, y: selectedNode?.y ?? 0 }
}

