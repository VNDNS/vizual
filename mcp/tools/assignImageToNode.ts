import WebSocket from 'ws'

export const assignImageToNode = (node: string, image: string) => {
  const ws = new WebSocket('ws://localhost:4000')
  ws.on('open', () => {
    ws.send(JSON.stringify({
      type: 'assignImageToNode',
      node,
      image
    }))
    ws.close()
  })
}