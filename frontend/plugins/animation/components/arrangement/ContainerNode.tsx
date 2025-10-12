import { nodeSize } from "../../constants";
import { useAnimation } from "../../context";

interface NodeProps {
  x: number;
  y: number;
  name: string;
  id: number;
  selected?: boolean;
  multiSelected?: boolean;
  width?: number;
  height?: number;
}

export const ContainerNode = ({ x, y, name, id, selected, multiSelected, width = nodeSize, height = nodeSize }: NodeProps) => {
  
  const { setSelectedNode, setSelectedEdge, setSelectedNodes, selectedNodes } = useAnimation()

  const handleClick = (e: React.MouseEvent, id: number) => {

    e.stopPropagation();
    if (e.shiftKey) {
      setSelectedNodes([...selectedNodes, id])
    } else {
      setSelectedNodes([id])
      setSelectedNode(id)
    }
    setSelectedEdge(null)
  }

  return (
    <g transform={`translate(${x}, ${y})`} onClick={(e) => handleClick(e, id)}  style={{ userSelect: "none" }}>
      <rect
        x={-width/2}
        y={-height/2}
        width={width}
        height={height}
        rx={10}
        ry={10}
        fill={selected ? "lime" : multiSelected ? "green" : "violet"}
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
  );
};

