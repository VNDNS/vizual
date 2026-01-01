import { useAnimation } from "@context/context";
import { useHandleComponentMouseDown } from "./useHandleComponentMouseDown";


export const ArrangementItem = ({ props }: any) => {

  const handleMouseDown = useHandleComponentMouseDown(props.id, "component");
  const { color, name, configuration } = props;
  const { width, height, x, y } = configuration;
  const { selectedItems } = useAnimation();

  const isSelected = selectedItems.some((item: any) => item.id === props.id);

  const groupProps = {
    transform: `translate(${x}, ${y})`,
    onMouseDown: handleMouseDown,
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
    className: `arrangement-item ${isSelected ? "selected" : ""}`
  };

  return (
    <g {...groupProps}>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        fill={color}
        rx={10}
        ry={10}
        stroke={isSelected ? "#00ff00" : "none"}
        strokeWidth={isSelected ? 4 : 0} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={32}>{name}</text>
    </g>
  );
};
