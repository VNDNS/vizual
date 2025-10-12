import { useAnimation } from "@context/context";
import { useComputed } from "@context/hooks/useComputed";


export const useDragCamera = () => {

  const { draggingDeltaScreen } = useComputed();
  const { setCamera, camera } = useAnimation();

  const updateCamera = () => {
    const x = camera.x + draggingDeltaScreen.x;
    const y = camera.y + draggingDeltaScreen.y;
    setCamera({ ...camera, x, y });
  };

  return updateCamera;
};
