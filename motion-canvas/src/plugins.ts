import {makePlugin} from '@motion-canvas/core';
import { sendMessage } from './websocket';

export default makePlugin({
  name: 'motion-canvas-plugin-example',
  player(player) {
    player.onFrameChanged.subscribe(() => {
      const payload = player.status.frame.toString()
      const message = JSON.stringify({type: 'frame', payload})
      sendMessage(message)
    });
  },
  project(project) {
    console.log(project)
  }
});

