import WebSocket from 'ws'

export const fadeInNodes = (nodeNames: string[]) => {
  if (!nodeNames.length) {
    return
  }
  const ws = new WebSocket('ws://localhost:4000')
  ws.on('open', () => {
    ws.send(JSON.stringify({
      type: 'fadeInNodes',
      nodeNames
    }))
    ws.close()
  })
}

