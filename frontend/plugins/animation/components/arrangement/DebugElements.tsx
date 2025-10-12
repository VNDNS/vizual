import { useAnimation } from "@context/context";
import { useComputed } from "@context/hooks/useComputed";


export const DebugElements = () => {

  const { draggingStart, draggingCurrent, zoom, debug } = useAnimation();
  const { draggingStartScreen, draggingCurrentScreen, draggingSnapped } = useComputed();

  if(!debug) return null

  return (
    <>
      {draggingStart && draggingCurrent && (
        <>
          <circle cx={draggingStartScreen?.x} cy={draggingStartScreen?.y} r={5 / zoom} fill="red" />
          <circle cx={draggingCurrentScreen?.x} cy={draggingCurrentScreen?.y} r={5 / zoom} fill="red" />
          <circle cx={draggingSnapped?.dx} cy={draggingSnapped?.dy} r={5 / zoom} fill="red" opacity={0.5} />
          <line opacity={0.5} strokeWidth={2 / zoom} x1={draggingCurrentScreen?.x} y1={draggingCurrentScreen?.y} x2={draggingSnapped?.dx} y2={draggingSnapped?.dy} stroke="red" />
          <line strokeWidth={2 / zoom} x1={draggingStartScreen?.x} y1={draggingStartScreen?.y} x2={draggingCurrentScreen?.x} y2={draggingCurrentScreen?.y} stroke="red" />
        </>
      )}
    </>
  );
};
