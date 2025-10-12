import WebSocket from 'ws'

export const addItemToContainer = (containerName: string, name: string) => {

  const ws = new WebSocket('ws://localhost:4000')
  ws.on('open', () => {
    ws.send(JSON.stringify({
      type: 'addItemToContainer',
      containerName,
      name
    }))
    ws.close()
  })
}