import fs from 'fs'
import WebSocket from 'ws'

type NodeInput = {
  parentName: string
  name: string
}

export const addNodes = (nodesInput: NodeInput[]) => {
  if (!nodesInput.length) {
    return
  }
  const fileContent = fs.readFileSync('/home/viktor/code/vizual/motion-canvas/src/scenes/preview/json/animation.json', 'utf-8')
  const animation = JSON.parse(fileContent)
  const flowchart = animation.components.find((component: any) => component.type === 'flowChart')?.configuration.data
  if (!flowchart) {
    throw new Error('Flowchart not found')
  }
  const nodes = flowchart.nodes
  const createdNodes: any[] = []
  nodesInput.forEach((input) => {
    const parentNode = nodes.find((node: any) => node.name === input.parentName)
    const newNode: any = {}
    newNode.id = Math.floor(Math.random() * 1000000)
    newNode.parent = parentNode?.id
    newNode.children = []
    newNode.x = (parentNode?.x ?? 0) + 100
    newNode.y = parentNode?.y ?? 0
    newNode.year = 0
    newNode.startSide = 'right'
    newNode.endSide = 'left'
    newNode.text = ''
    newNode.name = input.name
    nodes.push(newNode)
    if (parentNode) {
      parentNode.children.push(newNode.id)
    }
    createdNodes.push(newNode)
  })
  const ws = new WebSocket('ws://localhost:4000')
  ws.on('open', () => {
    ws.send(JSON.stringify({
      type: 'addNodes',
      nodes: createdNodes
    }))
    ws.close()
  })
}

