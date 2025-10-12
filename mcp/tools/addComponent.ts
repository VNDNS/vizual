import WebSocket from 'ws'

export const addComponent = (componentName: string) => {
  const ws = new WebSocket('ws://localhost:4000')
  ws.on('open', () => {
    ws.send(JSON.stringify({
      type: 'addComponent',
      componentName
    }))
    ws.close()
  })
}