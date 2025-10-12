import { useAnimation } from "@context/context";
import { useComputed } from "@context/hooks/useComputed";

export const useZoomCamera = () => {
  const { draggingDeltaScreen } = useComputed();
  const { setCamera, camera } = useAnimation();

  const zoomCamera = () => {
    const x = camera.x + draggingDeltaScreen.x;
    const newWidth = camera.width + (x - camera.x) * 2;
    const cameraZoom = newWidth / camera.width;
    const newHeight = camera.height * cameraZoom;
    setCamera({ ...camera, zoom: cameraZoom, width: newWidth, height: newHeight });
  };

  return zoomCamera;
}