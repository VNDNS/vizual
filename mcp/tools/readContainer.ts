import fs from 'fs'

export const readContainer = (containerName: string) => {
  const fileContent = fs.readFileSync(`/home/viktor/code/vizual/motion-canvas/src/scenes/preview/json/animation.json`, 'utf-8')
  const animation =  JSON.parse(fileContent)
  const components = animation.components
  const container = components.find((component: any) => component.name === containerName)

  const items = container.configuration.data.items
  const mapped = items.map((item: any) => ({
    name: item.name
  }))
  return mapped
}