import { useAnimation } from "@context/context";
import { applyGridSnap } from "./applyGridSnap";


export const useSnapCamera = () => {

  const { setCamera, camera } = useAnimation();

  const snapCamera = () => {
    const { dx: x, dy: y } = applyGridSnap(camera.x, camera.y);
    const { dx } = applyGridSnap(camera.width / 2, camera.height / 2);
    const newWidth = dx * 2;
    const cameraZoom = newWidth / 1920;
    const newHeight = newWidth * 1080 / 1920;

    setCamera({ ...camera, x: x, y: y, width: newWidth, height: newHeight, zoom: cameraZoom });
  };

  return snapCamera;
};
