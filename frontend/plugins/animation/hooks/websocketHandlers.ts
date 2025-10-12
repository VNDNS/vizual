import { Handler } from './websocketHandlers/types'
import { handleAddNode } from './websocketHandlers/handleAddNode'
import { handleAddNodes } from './websocketHandlers/handleAddNodes'
import { handleAddItemToContainer } from './websocketHandlers/handleAddItemToContainer'
import { handleFrame } from './websocketHandlers/handleFrame'
import { handleAddComponent } from './websocketHandlers/handleAddComponent'
import { handleFocusOnSelection } from './websocketHandlers/handleFocusOnSelection'
import { handleFadeInNodes } from './websocketHandlers/handleFadeInNodes'
import { handleAssignImageToNode } from './websocketHandlers/handleAssignImageToNode'


export const handlerMap: Record<string, Handler> = {
  addNode: handleAddNode,
  addNodes: handleAddNodes,
  addItemToContainer: handleAddItemToContainer,
  frame: handleFrame,
  addComponent: handleAddComponent,
  focusOnSelection: handleFocusOnSelection,
  fadeInNodes: handleFadeInNodes,
  assignImageToNode: handleAssignImageToNode
}


