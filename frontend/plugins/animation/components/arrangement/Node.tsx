import { nodeSize } from "../../constants"
import { useHandleNodeMouseDown } from "./useHandleNodeMouseDown"

interface NodeProps {
  x: number
  y: number
  name: string
  id: number
  selected?: boolean
  multiSelected?: boolean
  width?: number
  height?: number
}

export const Node = (data: NodeProps) => {
  
  const { x, y, name, id, selected, multiSelected, width = nodeSize, height = nodeSize } = data
  
  const handleMouseDown = useHandleNodeMouseDown(id)

  const groupProps = {
    transform: `translate(${x}, ${y})`,
    onMouseDown: handleMouseDown,
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
    className: "node"
  }

  const rectProps = {
    x: -width/2,
    y: -height/2,
    width: width,
    height: height,
    rx: 10,
    ry: 10,
    fill: selected ? "lime" : multiSelected ? "green" : "coral",
    stroke: "#ffffff",
    strokeWidth: 3,
  }

  const textProps = {
    x: 0,
    y: 0,
    dominantBaseline: "middle",
    fontSize: 40,
    textAnchor: "middle",
    fill: "black",
  }

  return (
    <g {...groupProps}>
      <rect {...rectProps} />
      <text {...textProps}>
        {name}
      </text>
    </g>
  )
}

