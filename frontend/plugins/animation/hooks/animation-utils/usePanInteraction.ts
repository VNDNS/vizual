import { useAnimation } from "../../context"

export const useHandlePan = () => {
  const { origin, setOrigin, setDraggingElement } = useAnimation()

  const handlePan = (e: React.MouseEvent) => {
    if (e.button !== 1) return;
    setDraggingElement("screen-pan");

    const startX = e.clientX - origin.dx
    const startY = e.clientY - origin.dy

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY
      setOrigin({ dx, dy })
    }

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return { handlePan }
}

