import { useAnimation } from "@context/context";
import { useComputed } from "@context/hooks/useComputed";


export const SelectionBox = () => {

  const { zoom } = useAnimation();
  const { draggingStartScreen, draggingCurrentScreen, showSelectionBox } = useComputed();

  if(!showSelectionBox) return null

  return (
    <rect
      x={Math.min(draggingStartScreen!.x, draggingCurrentScreen!.x)}
      y={Math.min(draggingStartScreen!.y, draggingCurrentScreen!.y)}
      width={Math.abs(draggingCurrentScreen!.x - draggingStartScreen!.x)}
      height={Math.abs(draggingCurrentScreen!.y - draggingStartScreen!.y)}
      fill="rgba(0, 120, 215, 0.2)"
      stroke="rgba(0, 120, 215, 0.8)"
      strokeWidth={1 / zoom}
      pointerEvents="none" />
  );
};
