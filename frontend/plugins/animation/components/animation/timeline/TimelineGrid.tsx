import { useAnimation } from "../../../context"
import { useTimelineMeasurements } from "../../../hooks/useTimelineMeasurements"

export const  TimelineGrid = () => {
  const { timelineScrollX } = useAnimation()
  const { baseUnit, snapUnit } = useTimelineMeasurements()
  return (
    <div 
      className="timeline-grid"
      style={{
        backgroundSize: `${baseUnit}px 100%, ${snapUnit}px 100%`,
        backgroundPosition: `${timelineScrollX + 10}px 0, ${timelineScrollX + 10}px 0`,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0
      }}
    />
  )
}

