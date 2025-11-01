import { ThreadGenerator } from "@motion-canvas/core";
import { sendMessage } from "../../websocket";

export const sendDurations = (clips: {animation: ThreadGenerator, duration: number}[]) => {
  const message = JSON.stringify({type: 'durations', payload: clips})
  sendMessage(message)
}