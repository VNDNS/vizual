import { useCallback, useRef, useMemo } from "react"
import { useAnimation } from "../../../context"
import type { MouseEvent as ReactMouseEvent } from "react"

export const useTimelineDrag = () => {
  const { 
    animation, 
    audioClips, 
    selectedTimelineItems, 
    setAnimation, 
    setAudioClips, 
    setSelectedTimelineItems,
    timelineScale
  } = useAnimation()

  const clips = useMemo(() => [...animation, ...audioClips], [animation, audioClips])
  const baseUnit = useMemo(() => 100 * timelineScale, [timelineScale])
  const snapUnit = useMemo(() => 20 * timelineScale, [timelineScale])
  const snapToGrid = useCallback((value: number) => Math.round(value / snapUnit) * snapUnit, [snapUnit])

  const selectionRef = useRef<string[]>(selectedTimelineItems)
  selectionRef.current = selectedTimelineItems

  return useCallback(
    (event: ReactMouseEvent, id: string) => {
      if (event.button === 1) return
      event.stopPropagation()

      const currentSelection = selectionRef.current.includes(id)
        ? selectionRef.current
        : event.shiftKey
          ? [...selectionRef.current, id]
          : [id]

      const hasChanged =
        currentSelection.length !== selectionRef.current.length ||
        currentSelection.some((value, index) => value !== selectionRef.current[index])

      if (hasChanged) {
        setSelectedTimelineItems(currentSelection)
        selectionRef.current = currentSelection
      }

      const startX = event.clientX
      const itemsToMove = currentSelection.includes(id) ? currentSelection : [id]

      const initialPositions = new Map(
        clips
          .filter(entry => itemsToMove.includes(entry.id))
          .map(entry => [entry.id, entry.start || 0]),
      )

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX

        const updatedAnimations = animation.map(entry => {
          if (!itemsToMove.includes(entry.id)) return entry
          const initialPos = initialPositions.get(entry.id) ?? 0
          const newLeft = Math.max(0, initialPos * baseUnit + deltaX)
          const snappedLeft = snapToGrid(newLeft - 10) + 10
          const newStart = Number(((snappedLeft - 10) / baseUnit).toFixed(2))
          return { ...entry, start: newStart }
        })

        const updatedAudio = audioClips.map(entry => {
          if (!itemsToMove.includes(entry.id)) return entry
          const initialPos = initialPositions.get(entry.id) ?? 0
          const newLeft = Math.max(0, initialPos * baseUnit + deltaX)
          const snappedLeft = snapToGrid(newLeft - 10) + 10
          const newStart = Number(((snappedLeft - 10) / baseUnit).toFixed(2))
          return { ...entry, start: newStart }
        })

        const sortedAnimation = [...updatedAnimations].sort((a, b) => (a.start || 0) - (b.start || 0))
        const sortedAudio = [...updatedAudio].sort((a, b) => (a.start || 0) - (b.start || 0))

        setAnimation(sortedAnimation)
        setAudioClips(sortedAudio)
      }

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
      }

      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    },
    [animation, audioClips, baseUnit, clips, setAnimation, setAudioClips, setSelectedTimelineItems, snapToGrid],
  )
}

export const useTimelineResize = () => {
  const { animation, setAnimation, timelineScale } = useAnimation()

  const baseUnit = useMemo(() => 100 * timelineScale, [timelineScale])
  const snapUnit = useMemo(() => 20 * timelineScale, [timelineScale])
  const snapToGrid = useCallback((value: number) => Math.round(value / snapUnit) * snapUnit, [snapUnit])
  return useCallback(
    (event: ReactMouseEvent, id: string, initialWidth: number) => {
      if (event.button === 1) return
      event.stopPropagation()

      const startX = event.clientX

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX
        const newWidth = Math.max(10 * timelineScale, initialWidth + deltaX)
        const snappedWidth = snapToGrid(newWidth)

        const updated = animation.map(entry => {
          if (entry.id !== id) return entry
          const newDuration = Number((snappedWidth / baseUnit).toFixed(2))
          return { ...entry, duration: newDuration }
        })

        setAnimation(updated)
      }

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
      }

      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    },
    [animation, baseUnit, setAnimation, snapToGrid, timelineScale],
  )
}

export const useTimelinePan = () => {
  const { timelineScrollX, setTimelineScrollX } = useAnimation()
  return useCallback(
    (event: ReactMouseEvent) => {
      const startX = event.clientX
      const initialScroll = timelineScrollX

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX
        setTimelineScrollX(initialScroll + deltaX)
      }

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
      }

      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    },
    [setTimelineScrollX, timelineScrollX],
  )
}

export const useTimelineFrameHandle = () => {
  const { animation, frame, setFrame, timelineScale } = useAnimation()
  const baseUnit = useMemo(() => 100 * timelineScale, [timelineScale])
  return useCallback(
    (event: ReactMouseEvent) => {
      event.stopPropagation()
      event.preventDefault()
      const startX = event.clientX
      const initialFrame = frame

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX
        const newFrame = Math.max(0, initialFrame + deltaX / baseUnit)
        const maxTime = Math.max(
          ...animation.map(item => (item.start || 0) + (item.duration || 0)),
          0,
        )
        const constrainedFrame = Math.min(newFrame, maxTime)
        setFrame(Number(constrainedFrame.toFixed(2)))
      }

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
      }

      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    },
    [animation, baseUnit, frame, setFrame],
  )
}

