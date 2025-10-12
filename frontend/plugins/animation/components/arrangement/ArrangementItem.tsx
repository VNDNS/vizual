import { useMakeDraggable } from "@context/hooks/useMageDraggable";
import { useAnimation } from "@context/context";


export const ArrangementItem = ({ x, y, id, width, height, size, color, name }: any) => {

  const { setComponents, selectedComponent, setSelectedComponent, zoom } = useAnimation();

  const offsetX = width ? width / 2 : size / 2;
  const offsetY = height ? height / 2 : size / 2;

  const item = { x, y, id, width, height, size };

  const updateItem = (x: number, y: number) => {
    setComponents((prevData: any[]) => {
      const newComponents = prevData.map((r: any) => (r.id === id ? { ...r, configuration: { ...r.configuration, x, y } } as any : r))
      return newComponents
    });
  }

  const isSelected = id === selectedComponent;

  const handleDragItem = useMakeDraggable(item, updateItem);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComponent(id);
  }

  return (
    <g onClick={(e) => handleClick(e)} className={`arrangement-item ${isSelected ? "selected" : ""}`} onMouseDown={(e) => handleDragItem(e)} transform={`translate(${x - offsetX}, ${y - offsetY})`}>
      <rect width={width || size} height={height || size} fill={color} rx={10} ry={10} />
      <text x={(width || size) / 2} y={(height || size) / 2} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={16 / zoom}>{name}</text>
    </g>
  );
};
