import { useAnimation } from "../../context";
import { interpolateCamera } from "./interpolateCamera";

export const CameraPath = () => {

  const {frame, animation, showCameraPath } = useAnimation();
  const cameraSnapshots = animation.filter((item: any) => item.component === "camera")
  const interpolatedCamera = interpolateCamera(cameraSnapshots, frame)

  const scale = 1/interpolatedCamera.zoom

  if(!showCameraPath) return null

  return (
    <g transform={`translate(${interpolatedCamera.x}, ${interpolatedCamera.y}) scale(${scale})`}>
      <rect className="camera-boundary" opacity={.5} width={1920} x={-960} y={-540} height={1080} stroke="lime" fill="none" strokeWidth={3/scale} rx={5} ry={5} />
      <circle cx={0} cy={0} r={3/scale} opacity={1} style={{zIndex: 100000}} fill="lime" />

    </g>
  );
};




