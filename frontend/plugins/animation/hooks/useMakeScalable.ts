import { useAnimation } from "@context/context"

export const useMakeScalable = (element: any, updateElement: (x: number, y: number) => void) => {
  const {isDraggingRef, zoom } = useAnimation()

  const handleDragElement = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isDraggingRef.current) return;
    isDraggingRef.current = true;

    const clientX0 = e.clientX;
    const clientY0 = e.clientY;
    const elementX0 = element.x;
    const elementY0 = element.y;

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const newX = (moveEvent.clientX - clientX0)/ zoom + elementX0
      const newY = (moveEvent.clientY - clientY0)/ zoom + elementY0
      const gridSize = 60;
      const snappedX = Math.round(newX / gridSize) * gridSize;
      const snappedY = Math.round(newY / gridSize) * gridSize;
      updateElement(snappedX, snappedY)
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  return handleDragElement
}