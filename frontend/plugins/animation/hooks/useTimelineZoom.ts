import { useAnimation } from "../context"

export const useTimelineZoom = () => {
  const { timelineScale, setTimelineScale } = useAnimation()

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault()
      const delta = -e.deltaY / 1000
      const newScale = Math.min(Math.max(0.2, timelineScale + delta), 5)
      setTimelineScale(newScale)
    }
  }

  return { handleWheel }
}

