import { useAnimation } from "@context/context";
import { useComputed } from "@context/hooks/useComputed";

export const DebugOverlay = () => {

  const { origin, draggingElement, debug, selectedItems, camera } = useAnimation();
  const { draggingStartScreen, draggingCurrentScreen, isDragging } = useComputed();

  if(!debug) return null

  return (
    <div style={{ position: "absolute", left: 0, bottom: 0, zIndex: 100000 }}>
      <text x={100} y={100} fill="white">
        <div>origin: {Math.round(origin.dx)},{Math.round(origin.dy)}</div>
        <div>draggingStart: {Math.round(draggingStartScreen?.x ?? 0)},{Math.round(draggingStartScreen?.y ?? 0)}</div>
        <div>draggingCurrent: {Math.round(draggingCurrentScreen?.x ?? 0)},{Math.round(draggingCurrentScreen?.y ?? 0)}</div>
        <div>draggingElement: {draggingElement}</div>
        <div>isDragging: {isDragging ? "true" : "false"}</div>
        <div>selectedItems: {selectedItems.length}</div>
        <div>camera zoom: {Math.floor(1920/camera.width*100)}%</div>
      </text>
    </div>
  );
};
