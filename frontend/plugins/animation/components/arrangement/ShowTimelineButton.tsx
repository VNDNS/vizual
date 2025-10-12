import { useAnimation } from "@context/context"

export const ShowTimelineButton = () => {

  const { showTimeline, setShowTimeline } = useAnimation()
  
  return (
    <button className="show-timeline-button" onClick={() => setShowTimeline(!showTimeline)}>Show Timeline</button>
  )
}