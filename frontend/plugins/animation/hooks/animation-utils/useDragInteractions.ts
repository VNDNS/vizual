import { useAnimation } from "../../context"
import { useSelectors } from "./useSelectors"
import { ComponentUI } from "../../../../../types/ComponentUI"

export const useDragInteractions = () => {
  const { 
    selectedNode,
    selectedComponent,
    camera,
    setCamera,
    setSelectedNode,
    setSelectedEdge,
    setSelectedComponent,
    setComponents,
    isDraggingRef,
    components
  } = useAnimation()
  const { getSelectedComponent } = useSelectors()

  const handleDragNode = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    if (selectedNode !== id) {
      setSelectedNode(id)
      setSelectedEdge(null)
    }

    if (isDraggingRef.current) return;
    isDraggingRef.current = true;

    const component = getSelectedComponent()

    const rect = component?.configuration.data.nodes.find((r: any) => r.id === id);
    if (!rect) {
      isDraggingRef.current = false;
      return;
    }

    const startX = e.clientX - rect.x;
    const startY = e.clientY - rect.y;

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const newX = moveEvent.clientX - startX;
      const newY = moveEvent.clientY - startY;
      setComponents((prevData: ComponentUI[]) => {
        const newComponents = prevData.map((r: ComponentUI) => (
          r.id === component?.id ? { ...r, configuration: { ...r.configuration, data: { ...r.configuration.data, nodes: r.configuration.data.nodes.map((node: any) => (node.id === id ? { ...node, x: newX, y: newY } : node)) } } } as ComponentUI : r))
        return newComponents
      });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleDragCamera = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    if (isDraggingRef.current) return;
    isDraggingRef.current = true;

    if (!camera) {
      isDraggingRef.current = false;
      return;
    }

    const startX = e.clientX - camera.x;
    const startY = e.clientY - camera.y;

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const newX = moveEvent.clientX - startX;
      const newY = moveEvent.clientY - startY;
      setCamera({ ...camera, x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleDragComponent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    if (selectedComponent !== id) {
      setSelectedComponent(id)
    }

    if (isDraggingRef.current) return;
    isDraggingRef.current = true;

    const rect = components.find((r: ComponentUI) => r.id === id);
    if (!rect) {
      isDraggingRef.current = false;
      return;
    }

    const startX = e.clientX - rect.configuration.x;
    const startY = e.clientY - rect.configuration.y;

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const newX = moveEvent.clientX - startX;
      const newY = moveEvent.clientY - startY;
      setComponents((prevData: any[]) => {
        const newComponents = prevData.map((r: any) => (r.id === id ? { ...r, configuration: { ...r.configuration, x: newX, y: newY } } as any : r))
        return newComponents
      });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return { handleDragNode, handleDragCamera, handleDragComponent }
}

