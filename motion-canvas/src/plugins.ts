import {makePlugin} from '@motion-canvas/core';

let ws: WebSocket

const connect = () => {
  ws = new WebSocket('ws://localhost:4000')
  ws.addEventListener('close', () => {
    setTimeout(connect, 1000)
  })
}

connect()


export default makePlugin({
  name: 'motion-canvas-plugin-example',
  player(player) {
    player.onFrameChanged.subscribe(() => {
      const payload = player.status.frame.toString()
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({type: 'frame', payload}))
      } else {
        if (ws.readyState !== WebSocket.CONNECTING) connect()
        ws.addEventListener('open', () => ws.send(JSON.stringify({type: 'frame', payload})), { once: true })
      }
    });
  },
  project(project) {
    console.log(project)
  }
});

