import { FlowChartNode } from "@type/FlowChartTypes"

export const createNewNode = (
  newNodeId: number,
  position: { x: number; y: number },
  nodesLength: number,
  componentId: string,
  selectedNode: FlowChartNode | undefined,
  selectedNodes: FlowChartNode[]
): FlowChartNode => {
  const node: FlowChartNode = {
    id: newNodeId,
    children: [],
    x: position.x,
    y: position.y,
    year: 0,
    startSide: 'right',
    endSide: 'left',
    text: '',
    suggestedChildren: [],
    name: `Node ${nodesLength + 1}`,
    componentId: componentId,
    type: 'square',
    width: 240,
    height: 240,
    color: 'hsl(0, 70%, 50%)'
  }

  if (selectedNodes.length > 1) {
    node.parents = selectedNodes.map(n => n.id)
    selectedNodes.forEach((selectedNode_) => {
      selectedNode_.children.push(newNodeId)
    })
  } else if (selectedNode) {
    node.parent = selectedNode.id
    selectedNode.children.push(newNodeId)
  }

  return node
}

