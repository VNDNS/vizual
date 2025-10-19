import { useAnimation } from "@context/context"
import { useComputed } from "@context/hooks/useComputed"
import { useDragItems } from "@context/hooks/useDragItems"
import { useEffect } from "react"
import { useUpdateSelection } from "./useUpdateSelection"
import { useDragCamera } from "./useDragCamera"
import { useSnapCamera } from "./useSnapCamera"
import { useSnapItems } from "@context/hooks/useSnapItems"
import { useZoomCamera } from "./useUpdateCameraZoom"

export const useHandleScreenDragging = () => {

  const { draggingElement }       = useAnimation()
  const { draggingStartScreen }   = useComputed()
  const { draggingCurrentScreen } = useComputed()
  const { isDragging }            = useComputed()
  const updateSelection           = useUpdateSelection()
  const snapItems                 = useSnapItems()
  const updateCamera              = useDragCamera()
  const updateCameraZoom          = useZoomCamera()
  const snapCamera                = useSnapCamera()
  const dragItems                 = useDragItems()

  const showSelectionBox   = draggingElement === "screen"      && isDragging
  const draggingNodes      = draggingElement === "node"        && isDragging
  const draggingCameraMove = draggingElement === "camera-move" && isDragging
  const draggingCameraZoom = draggingElement === "camera-zoom" && isDragging
  const draggingComponent  = draggingElement === "component"   && isDragging

  useEffect(() => {
    if (showSelectionBox) {
      updateSelection(draggingStartScreen!, draggingCurrentScreen!)
    }
    if (draggingNodes) {
      dragItems()
    }
    if (draggingComponent) {
      dragItems()
      console.log("draggingComponent")
    }
    if (draggingCameraMove) {
      updateCamera()
    }
    if (draggingCameraZoom) {
      updateCameraZoom()
    }
  }, [draggingCurrentScreen])

  useEffect(() => {
    if (isDragging) {
      // on drag start
    } else {
      // on drag end
      snapItems()
      snapCamera()
    }
  }, [isDragging])
}
