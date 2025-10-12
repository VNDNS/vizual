import { useRef } from "react";
import { useAnimation } from "../../context";
import { Camera } from "./Camera";
import { ArrangementItems } from "./ArrangementItems";
import { useHandleZoom } from "./useHandleZoom";
import { CameraPath } from "./CameraPath";
import { useScreenDrag } from "./useScreenDrag";
import { Origin } from "./Origin";
import { DebugElements } from "./DebugElements";
import { SelectionBox } from "./SelectionBox";
import { Grid } from "./Grid";
import { DebugOverlay } from "./DebugOverlay";
import { useHandleScreenDragging } from "./useHandleScreenDragging";
import { useHandleScreenMouseDown } from "./useHandleScreenMouseDown";

export const Screen = () => {

  const { origin, zoom } = useAnimation();
  
  const handleZoom            = useHandleZoom()
  const screenRef             = useRef<HTMLDivElement | null>(null)
  const handleScreenMouseDown = useHandleScreenMouseDown()
  
  useScreenDrag(screenRef)
  useHandleScreenDragging()

  return (
    <div className="arrangement">
      <div className="container">
        <DebugOverlay />
        <div className="screen" id="screen" ref={screenRef} onMouseDown={handleScreenMouseDown} onWheel={handleZoom}>
          <Grid />
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            <g  transform={`translate(${origin.dx}, ${origin.dy}) scale(${zoom})`}>
              <DebugElements />
              <Camera />
              <CameraPath />
              <SelectionBox />  
              <ArrangementItems />
              <Origin />  
            </g>  
          </svg>  
        </div>  
      </div>  
    </div>  
  )
}