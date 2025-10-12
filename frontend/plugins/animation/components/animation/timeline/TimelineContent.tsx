import { useAnimation } from "../../../context"
import { useTimelineMeasurements } from "../../../hooks/useTimelineMeasurements"
import { TimelineItem } from "./TimelineItem"

export const TimelineContent = () => {
  const { timelineScrollX } = useAnimation()
  const { gridSize, baseUnit, filteredAnimation } = useTimelineMeasurements()
  return (
    <div 
      className="timeline-content"
      style={{ 
        width: `${gridSize * baseUnit}px`,
        transform: `translateX(${timelineScrollX}px)`,
        position: 'relative'
      }}
    >
      {filteredAnimation.map(item => (
        <TimelineItem key={item.id} item={item} />
      ))}
    </div>
  )
}

