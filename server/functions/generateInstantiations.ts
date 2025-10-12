import { capitalize } from "./capitalize";

export function generateInstantiations(components: any[]) {


  const componentNames = components.map((component) => component.name)
  const componentsLine = `  const components = [${componentNames.join(', ')}]`


  const lines = components.map((component: any, i: number) => {
    
    const name = component.name
    const type = capitalize(component.type)
    const line = `  const ${name} = new ${type}(animationData.components[${i}].configuration)`
    
    return line
  })

  return [...lines, componentsLine].join('\n')
}
