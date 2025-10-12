import { componentUIColors } from '@context/maps/componentUIColors'
import { ComponentUI } from '@type/ComponentUI'
import { id } from '../../../../../common/id'
import { Message, HandlerContext } from './types'
import { readComponentData } from './readComponentData'

export const handleAddComponent = async (message: Message, context: HandlerContext) => {
  if (!message.componentName) {
    return
  }
  const { data, hasLayout } = await readComponentData(message.componentName)
  const component: ComponentUI = {
    type: message.componentName,
    configuration: {
      data,
      x: 0,
      y: 0,
      width: hasLayout ? 240 : undefined,
      height: hasLayout ? 240 : undefined,
      size: hasLayout ? undefined : 240
    },
    data: null,
    color: componentUIColors[context.components.length % componentUIColors.length],
    id: id(),
    name: `${message.componentName}${context.components.length}`
  }
  context.setComponents([...context.components, component])
}

