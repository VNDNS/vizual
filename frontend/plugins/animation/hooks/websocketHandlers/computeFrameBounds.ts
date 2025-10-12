export const computeFrameBounds = (nodes: any[]) => {
  const padding = 60
  const items = nodes.map(node => ({ x: node.x, y: node.y, width: 240, height: 240 }))
  const minX = Math.min(...items.map(item => item.x - item.width / 2 - padding))
  const minY = Math.min(...items.map(item => item.y - item.height / 2 - padding))
  const maxX = Math.max(...items.map(item => item.x + item.width / 2 + padding))
  const maxY = Math.max(...items.map(item => item.y + item.height / 2 + padding))
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2
  const width = maxX - minX
  const height = maxY - minY
  const scaledHeight = (width * 1080) / 1920
  const zoomBase = height > scaledHeight ? height / 1080 : width / 1920
  const zoom = zoomBase === 0 ? 1 : zoomBase
  return { centerX, centerY, zoom }
}

