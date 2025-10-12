import { useAnimation } from "@context/context";
import { useHandleComponentMouseDown } from "./useHandleComponentMouseDown";


export const Container = ({ x, y, data, id }: any) => {

  const { selectedItems } = useAnimation();

  const isSelected = selectedItems.some((item: any) => item.id === id);

  const handleMouseDown = useHandleComponentMouseDown(id, "component");

  const width_ = 4 * 60 * data.rows + (data.rows - 1) * 60 + 120;
  const comlumns = Math.ceil(data.items.length / data.rows);
  const height_ = 4 * 60 * comlumns + (comlumns - 1) * 60 + 120;
  
  const positions = data.items.map((item: any, index: number) => ({
    x: -width_ / 2 + 60 + (index % data.rows) * 300,
    y: -height_ / 2 + 60 + Math.floor(index / data.rows) * 300
  }));

  const groupProps = {
    transform: `translate(${x}, ${y})`,
    onMouseDown: handleMouseDown,
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
    className: "node"
  };

  const rectProps = {
    x: -width_ / 2,
    y: -height_ / 2,
    width: width_,
    height: height_,
    rx: 10,
    ry: 10,
    fill: isSelected ? "green" : "coral",
    stroke: "#ffffff",
    strokeWidth: 3,
  };


  return (
    <g {...groupProps}>
      <rect {...rectProps} />
      {data.items.map((item: any, index: number) => (
        <g key={item.id}>
          <text key={item.id} x={positions[index].x + 4 * 60 / 2} y={positions[index].y + 4 * 60 / 2} textAnchor="middle" dominantBaseline="middle" fill="black" fontSize={40}>{item.name}</text>
          <rect key={item.id} x={positions[index].x} y={positions[index].y} width={4 * 60} height={4 * 60} stroke="black" strokeWidth={1} fill="transparent" rx={10} ry={10} />
        </g>
      ))}
      <circle cx={0} cy={0} r={10} fill="red" />
    </g>
  );
};
