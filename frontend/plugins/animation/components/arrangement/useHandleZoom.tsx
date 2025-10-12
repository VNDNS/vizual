import { useAnimation } from "../../context";


export const useHandleZoom = () => {
  const { zoom, setZoom } = useAnimation();

  const handleZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    const maxZoom = 10;
    const minZoom = 0.1;
    setZoom(Math.max(minZoom, Math.min(maxZoom, zoom + e.deltaY / 1000)));
  };

  return handleZoom;
};
