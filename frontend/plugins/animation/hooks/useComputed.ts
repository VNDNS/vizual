import { applyGridSnap } from "@context/components/arrangement/applyGridSnap";
import { useAnimation } from "@context/context";
import { useMemo } from "react";

export const useComputed = () => {
  const { draggingCurrent, draggingStart, origin, zoom, draggingElement, draggingDelta } = useAnimation();

  const draggingCurrentScreen = useMemo(() => {
    return draggingCurrent ? {x: (draggingCurrent.x - origin.dx) / zoom, y: (draggingCurrent.y - origin.dy) / zoom} : null;
  }, [draggingCurrent, zoom]);
  
  const draggingStartScreen = useMemo(() => {
    return draggingStart ? {x: (draggingStart.x - origin.dx) / zoom, y: (draggingStart.y - origin.dy) / zoom} : null;
  }, [draggingStart, zoom]);

  const draggingSnapped = useMemo(() => {
    return draggingCurrentScreen ? applyGridSnap(draggingCurrentScreen.x, draggingCurrentScreen.y) : null;
  }, [draggingCurrentScreen, zoom]);

  const draggingDeltaScreen = useMemo(() => {
    return {x: draggingDelta.x / zoom, y: draggingDelta.y / zoom}
  }, [draggingDelta, zoom]);

  const isDragging = !!draggingStart && !!draggingCurrent;

  const showSelectionBox = draggingElement === "screen" && isDragging;

  return {
    draggingCurrentScreen,
    draggingStartScreen,
    draggingSnapped,
    draggingDeltaScreen,
    isDragging,
    showSelectionBox,
  }
}