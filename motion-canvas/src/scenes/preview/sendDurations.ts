import { ThreadGenerator } from "@motion-canvas/core";

let ws: WebSocket
const connect = () => {
  ws = new WebSocket('ws://localhost:4000')
  ws.addEventListener('close', () => {
    setTimeout(connect, 1000)
  })
}

export const sendDurations = (clips: {animation: ThreadGenerator, duration: number}[]) => {

  connect()
  ws.send(JSON.stringify({type: 'durations', payload: clips}))
}