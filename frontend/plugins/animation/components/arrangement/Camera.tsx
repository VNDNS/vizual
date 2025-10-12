
import { useAnimation } from "../../context";

export const Camera = () => {

 const { cameraIsSelected, setCameraIsSelected, showCamera, camera, setLastCamera, setSidebarMode, setShowSidebar, setDraggingElement } = useAnimation();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCameraIsSelected(!cameraIsSelected);
    setSidebarMode('camera-configuration')
    setShowSidebar(true)
  }

  const handleMouseDownMoveHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLastCamera({...camera});
    setDraggingElement("camera-move");
  }

  const handleMouseDownZoomHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLastCamera({...camera});
    setDraggingElement("camera-zoom");
  }


  if(!showCamera) return null

  return (
    <g className={`camera ${cameraIsSelected ? "selected" : ""}`}>
      <rect onMouseDown={handleMouseDownMoveHandle} className="camera-handle" width={40} x={camera.x - camera.width/2} y={camera.y - camera.height/2} height={40} fill="lime" stroke="none" />
      <rect className="camera-boundary" width={camera.width} x={camera.x - camera.width/2} y={camera.y - camera.height/2} height={camera.height} stroke="lime" fill="none" strokeWidth={1} rx={5} ry={5} />
      <rect onMouseDown={handleMouseDownZoomHandle} className="zoom-handle" width={40} x={camera.x + camera.width/2 - 40} y={camera.y + camera.height/2 - 40} height={40} fill="lime" stroke="none" />
      <rect onClick={handleClick} className="selection-handle" width={40} x={camera.x + camera.width/2-  40} y={camera.y - camera.height/2} height={40}  fill="lime" strokeWidth={1}  />
      <line className="camera-cross-horizontal" x1={camera.x - 20} y1={camera.y} x2={camera.x + 20} y2={camera.y} stroke="red" strokeWidth={2} />
      <line className="camera-cross-vertical" x1={camera.x} y1={camera.y - 20} x2={camera.x} y2={camera.y + 20} stroke="red" strokeWidth={2} />
    </g>
  );
};




