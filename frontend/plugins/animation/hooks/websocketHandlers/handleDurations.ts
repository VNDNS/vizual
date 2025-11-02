import { ThreadGenerator } from "@motion-canvas/core"
import { HandlerContext, Message } from "./types"
import { AnimationUI } from "@type/AnimationUI"

export const handleDurations = (message: Message, context: HandlerContext) => {
  const { setAnimation } = context
  const  clips: {animation: ThreadGenerator, duration: number}[] = message.payload as any
  
  console.log(clips)
  setAnimation((prev) => {
    let i = 0
    let j = 0
    while (i < prev.length) {
      if (clips[j].animation) {
        prev[i].duration = clips[j].duration
        i++
      }
      j++
    }
    return prev
  })
}