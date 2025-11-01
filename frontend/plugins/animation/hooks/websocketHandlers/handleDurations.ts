import { ThreadGenerator } from "@motion-canvas/core"
import { HandlerContext, Message } from "./types"
import { AnimationUI } from "@type/AnimationUI"

export const handleDurations = (message: Message, context: HandlerContext) => {
  const { setAnimation } = context
  const  clips: {animation: ThreadGenerator, duration: number}[] = message.payload as any
  setAnimation((prev) => {
    return prev.map((item: AnimationUI, index: number) => ({
      ...item,
      duration: clips[index]?.duration ?? item.duration
    }))
  })
}