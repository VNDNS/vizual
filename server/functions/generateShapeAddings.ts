export function generateShapeAddings(components: any[]) {
  
  const lines = []
  lines.push('  const camera = new Camera(animationData.cameraInitialState ? { initialX: animationData.cameraInitialState.x, initialY: animationData.cameraInitialState.y, initialZoom: animationData.cameraInitialState.zoom } : {})')
  lines.push('  const panel = new Panel({data: animationData.panel})')
  lines.push('  const highlighter = new Highlighter({view, components})')
  lines.push('  view.add(camera)')
  lines.push('  view.add(panel)')
  lines.push('  view.add(highlighter)')
  const componentLines = components.map(component => `  camera.add(${component.name})`)
  lines.push(...componentLines)

  return lines.join('\n')
}
