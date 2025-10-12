import fs from 'fs'
import WebSocket from 'ws'

export const addNode = (parentName: string, name: string) => {
  const fileContent = fs.readFileSync(`/home/viktor/code/vizual/motion-canvas/src/scenes/preview/json/animation.json`, 'utf-8')
  const animation =  JSON.parse(fileContent)
  const flowchart = animation.components.find((component: any) => component.type === 'flowChart')?.configuration.data
  const nodes = flowchart.nodes
  const parentNode = nodes.find((n: any) => n.name === parentName)
  const node: any = {}
  node.id =  Math.floor(Math.random() * 1000000)
  node.parent = parentNode?.id
  node.children = []
  node.x = (parentNode?.x ?? 0) + 100
  node.y = (parentNode?.y ?? 0)
  node.year = 0
  node.startSide = 'right'
  node.endSide = 'left'
  node.text = ''
  node.name = name

  const newNodes = [...nodes, node]
  parentNode?.children.push(node.id)
  flowchart.nodes = newNodes

  const ws = new WebSocket('ws://localhost:4000')
  ws.on('open', () => {
    ws.send(JSON.stringify({
      type: 'addNode',
      parentName,
      node
    }))
    ws.close()
  })
}