import { useMemo, useCallback } from "react"
import { useAnimation } from "../context"

export const useTimelineMeasurements = () => {
  const { animation, audioClips, timelineScale } = useAnimation()
  const clips = useMemo(() => [...animation, ...audioClips], [animation, audioClips])

  const filteredAnimation = useMemo(() => {
    return animation
  }, [animation])

  const gridSize = useMemo(() => {
    const endTimes = filteredAnimation.map(item => {
      const start = item.start || 0
      const duration = item.duration || 0
      return start + duration
    })
    const maxEnd = endTimes.length ? Math.max(...endTimes) : 0
    return Math.ceil(maxEnd) + 2
  }, [filteredAnimation])

  const baseUnit = useMemo(() => 100 * timelineScale, [timelineScale])
  const snapUnit = useMemo(() => 20 * timelineScale, [timelineScale])

  const snapToGrid = useCallback(
    (value: number) => Math.round(value / snapUnit) * snapUnit,
    [snapUnit],
  )

  return {
    baseUnit,
    clips,
    filteredAnimation,
    gridSize,
    snapToGrid,
    snapUnit,
  }
}

