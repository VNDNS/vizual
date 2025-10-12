import { useAnimation } from "../../context"
import { useFetchAnimation } from "../../hooks/useFetchAnimation"
import { usePreventBrowserZoom } from "../../hooks/usePreventBrowserZoom"
import { useTimelineZoom } from "../../hooks/useTimelineZoom"
import { useTimelinePan } from "./timeline/TimelineInteractionHandlers"
import { TimelineGrid } from "./timeline/TimelineGrid"
import { FrameHandle } from "./timeline/FrameHandle"
import { TimelineContent } from "./timeline/TimelineContent"

export const Timeline = () => {
  const {
    selectedTimeline,
    setSelectedTimeline,
    setSelectedTimelineItems,
  } = useAnimation()

  useFetchAnimation()
  usePreventBrowserZoom()

  const handlePan = useTimelinePan()
  const { handleWheel } = useTimelineZoom()

  return (
    <div
      className={`timeline-container `}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('.timeline-item')) {
          setSelectedTimeline(selectedTimeline === 0 ? 0 : selectedTimeline)
        }
      }}
    >
      <div 
        className={`timeline`} 
        onWheel={handleWheel}
        onMouseDown={(e) => {
          if (!(e.target as HTMLElement).closest('.timeline-item')) {
            handlePan(e)
            setSelectedTimelineItems([])
          }
        }}
      >
        <FrameHandle />
        <TimelineGrid />
        <TimelineContent />
      </div>
    </div>
  )
}
