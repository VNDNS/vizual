import { AnimationContextType } from "@type/AnimationContextType"

export type Message = {
  type: string
  payload?: string | number
  node?: any
  nodes?: any[]
  containerName?: string
  name?: string
  componentName?: string
  nodeNames?: string[]
  image?: string
}

export type HandlerContext = AnimationContextType

export type Handler = (message: Message, context: HandlerContext) => Promise<void> | void

