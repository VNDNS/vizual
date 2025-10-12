import { Message, HandlerContext } from './types'

export const handleFrame = (message: Message, context: HandlerContext) => {
  const raw = typeof message.payload === 'string' ? parseInt(message.payload, 10) : Number(message.payload)
  if (!Number.isFinite(raw)) {
    return
  }
  context.setFrame(raw / 60)
}

