import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '../..')

export const readFlowchart = () => {
  const filePath = path.resolve(root, 'motion-canvas/src/scenes/preview/json/animation.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const animation =  JSON.parse(fileContent)
  const flowchart = animation.components.find((component: any) => component.type === 'flowChart')?.configuration.data
  const nodes = flowchart.nodes
  const mapped = nodes.map((node: any) => ({
    name: node.name,
    children: node.children.map((id: any) => nodes.find((n: any) => n.id === id)?.name),
  }))
  return mapped
}