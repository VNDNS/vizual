import WebSocket from 'ws'

export const focusOnSelection = (nodes: string[]) => {
  const ws = new WebSocket('ws://localhost:4000')
  ws.on('open', () => {
    ws.send(JSON.stringify({
      type: 'focusOnSelection',
      nodes
    }))
    ws.close()
  })
}