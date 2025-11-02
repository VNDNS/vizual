import { useSetPreviewAnimation } from "../../../../common/hooks/useSetPreviewAnimation"
import { AnimationUI } from "../../../../../../types/AnimationUI"
import { useAnimation } from "../../../context"
import { useTimelineMeasurements } from "../../../hooks/useTimelineMeasurements"
import { useTimelineDrag, useTimelineResize } from "./TimelineInteractionHandlers"

type Props = {
  item: AnimationUI
}

export const TimelineItem = ({ item }: Props) => {
  const { 
    animation, 
    components, 
    selectedMethod, 
    selectedTimelineItems, 
    setAnimation, 
    setSelectedComponent, 
    setSelectedMethod 
  } = useAnimation()
  const { baseUnit } = useTimelineMeasurements()
  const onDrag = useTimelineDrag()
  const onResize = useTimelineResize()
  const width = item.duration * baseUnit
  const left = item.start * baseUnit
  const component = components.find(entry => entry.name === item.component)
  const setPreviewAnimation = useSetPreviewAnimation()
  return (
    <div
      className={`timeline-item ${selectedMethod?.id === item.id ? "timeline-item-selected" : ""} ${
        selectedTimelineItems.includes(item.id) ? "timeline-item-multi-selected" : ""
      }`}
      onMouseDown={event => {
        if (!(event.target as HTMLElement).closest(".timeline-item-close, .timeline-item-resize-handle")) {
          onDrag(event, item.id)
        }
      }}
      onClick={event => {
        if (!(event.target as HTMLElement).closest(".timeline-item-close, .timeline-item-resize-handle")) {
          setSelectedMethod(item)
          setSelectedComponent(component?.id ?? null)
        }
      }}
      style={{
        width: `${width}px`,
        left: `${left}px`,
        outline: selectedTimelineItems.includes(item.id) ? "2px solid #fff" : "3px solid rgba(0, 0, 0, 0.5)",
        backgroundColor: component?.color || "violet",
      }}
    >
      <span className="timeline-item-name-container">
        <span className="timeline-item-name">{item.name || item.component}</span>
        <span className="timeline-item-method">{item.method}</span>
      </span>
      <button
        className="timeline-item-close"
        onClick={event => {
          event.stopPropagation()
          const updatedAnimation = animation.filter(entry => entry.id !== item.id)
          setAnimation(updatedAnimation)
          setPreviewAnimation(updatedAnimation)
        }}
      >
        x
      </button>
      <div
        className="timeline-item-resize-handle"
        onMouseDown={event => onResize(event, item.id, width)}
      />
    </div>
  )
}

