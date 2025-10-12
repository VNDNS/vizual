import fs from 'fs'

export const readFlowchart = () => {
  const fileContent = fs.readFileSync(`/home/viktor/code/vizual/motion-canvas/src/scenes/preview/json/animation.json`, 'utf-8')
  const animation =  JSON.parse(fileContent)
  const flowchart = animation.components.find((component: any) => component.type === 'flowChart')?.configuration.data
  const nodes = flowchart.nodes
  const mapped = nodes.map((node: any) => ({
    name: node.name,
    children: node.children.map((id: any) => nodes.find((n: any) => n.id === id)?.name),
  }))
  return mapped
}