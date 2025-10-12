import { useAnimation } from "../../../context"
import { useTimelineMeasurements } from "../../../hooks/useTimelineMeasurements"
import { useTimelineFrameHandle } from "./TimelineInteractionHandlers"

export const FrameHandle = () => {
  const { frame, timelineScrollX } = useAnimation()
  const { baseUnit } = useTimelineMeasurements()
  const onDrag = useTimelineFrameHandle()
  return (
    <div
      className="frame-handle"
      style={{left: frame * baseUnit + timelineScrollX + 10}}
    >
      <div className="frame-handle-inner" onMouseDown={onDrag} /> 
      <div className="frame-handle-text">{frame.toFixed(2)}</div>
    </div>
  )
}

