import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '../..')

export const readContainer = (containerName: string) => {
  const filePath = path.resolve(root, 'motion-canvas/src/scenes/preview/json/animation.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const animation =  JSON.parse(fileContent)
  const components = animation.components
  const container = components.find((component: any) => component.name === containerName)

  const items = container.configuration.data.items
  const mapped = items.map((item: any) => ({
    name: item.name
  }))
  return mapped
}