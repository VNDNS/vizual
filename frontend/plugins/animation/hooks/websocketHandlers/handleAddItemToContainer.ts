import { id } from '../../../../../common/id'
import { Message, HandlerContext } from './types'
import { cloneComponents } from './cloneComponents'

export const handleAddItemToContainer = (message: Message, context: HandlerContext) => {
  if (!message.containerName || !message.name) {
    return
  }
  const next = cloneComponents(context.components)
  const container = next.find((component: any) => component.name === message.containerName)
  if (!container) {
    return
  }
  container.configuration.data.items.push({ name: message.name, id: id(), image: '' })
  context.setComponents(next)
}

