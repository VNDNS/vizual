import { WebSocketServer, WebSocket, RawData } from 'ws'

export const initializeWebSocket = () => {
  console.log('initializing websocket')
  const wss = new WebSocketServer({ port: 4000 })

  const broadcast = (data: string | Buffer) => {
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    }
  }

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (data: RawData) => {
      const text = data.toString()
      const value = Number.parseInt(text, 10)
      if (!Number.isNaN(value)) {
        broadcast(value.toString())
      } else {
        broadcast(text)
      }
    })
  })

  return { wss, broadcast }
}