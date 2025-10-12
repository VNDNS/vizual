interface NodePresentationProps {
  x: number
  y: number
  name: string
  width: number
  height: number
  selected?: boolean
  multiSelected?: boolean
  isDragging: boolean
  onClick: (e: React.MouseEvent) => void
  onMouseDown: (e: React.MouseEvent) => void
}

export const NodePresentation = ({
  x,
  y,
  name,
  width,
  height,
  selected,
  multiSelected,
  isDragging,
  onClick,
  onMouseDown
}: NodePresentationProps) => {
  return (
    <g 
      transform={`translate(${x}, ${y})`} 
      onClick={onClick} 
      onMouseDown={onMouseDown} 
      onDragStart={(e) => e.preventDefault()} 
      style={{ userSelect: "none", cursor: isDragging ? "grabbing" : "grab" }}
    >
      <rect
        x={-width/2}
        y={-height/2}
        width={width}
        height={height}
        rx={10}
        ry={10}
        fill={selected ? "lime" : multiSelected ? "green" : "coral"}
        stroke="#ffffff"
        strokeWidth={3}
      />
      <text
        x={0}
        y={0}
        dominantBaseline="middle"
        fontSize={40}
        textAnchor="middle"
        fill="black"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {name}
      </text>
    </g>
  )
}

