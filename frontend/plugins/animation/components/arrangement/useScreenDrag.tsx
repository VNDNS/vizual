import { useAnimation } from "@context/context";
import { useEffect } from "react";

export const useScreenDrag = (screenRef: React.RefObject<HTMLDivElement | null>) => {

  const { setDraggingStart, setDraggingCurrent, setDraggingElement, setDraggingDelta } = useAnimation();

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    screen.addEventListener("mousedown", (e: MouseEvent) => {

      const start = { x: e.offsetX, y: e.offsetY };

      setDraggingStart(start);
      setDraggingCurrent(start);

      const handleMouseMove = (e: MouseEvent) => {
        const current = { x: e.offsetX, y: e.offsetY };
        setDraggingCurrent(current);
        setDraggingDelta({ x: e.movementX, y: e.movementY });
      };

      const handleMouseUp = () => {
        setDraggingCurrent(null);
        setDraggingStart(null);
        setDraggingElement(null);
        setDraggingDelta({ x: 0, y: 0 });
        screen.removeEventListener("mousemove", handleMouseMove);
        screen.removeEventListener("mouseleave", handleMouseLeave);
        screen.removeEventListener("mouseup", handleMouseUp);
      };

      const handleMouseLeave = () => {
        setDraggingCurrent(null);
        setDraggingStart(null);
        setDraggingElement(null);
        setDraggingDelta({ x: 0, y: 0 });
        screen.removeEventListener("mousemove", handleMouseMove);
      };

      screen.addEventListener("mousemove", handleMouseMove);
      screen.addEventListener("mouseup", handleMouseUp);
      screen.addEventListener("mouseleave", handleMouseLeave);
    });


  }, []);
};
