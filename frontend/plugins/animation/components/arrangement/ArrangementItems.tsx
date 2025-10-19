import { useAnimation } from "../../context";
import { Container } from "./Container";
import { FlowChart } from "./FlowChart";
import { useHandleComponentMouseDown } from "./useHandleComponentMouseDown";

const ArrangementItem = ({props}: any) => {

  const handleMouseDown = useHandleComponentMouseDown(props.id, "component");
  const { color, name, configuration } = props
  const { width, height, x, y } = configuration

  const groupProps = {
    transform: `translate(${x}, ${y})`,
    onMouseDown: handleMouseDown,
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
    className: "arrangement-item"
  };

  return (
    <g {...groupProps}>
      <rect x={x - width / 2} y={y - height / 2} width={width} height={height} fill={color} rx={10} ry={10} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={32}>{name}</text>
    </g>
  )
}

export const ArrangementItems = () => {

  const { components } = useAnimation();

  const flowCharts = components.filter((item: any) => item.type === 'flowChart') || []
  const containers = components.filter((item: any) => item.type === 'container') || []
  const rest       = components.filter((item: any) => item.type !== 'flowChart' && item.type !== 'container') || []

  return (
    <>
      {
        flowCharts.map(item => (
          <FlowChart key={item.id} data={item.configuration.data} />))
      }
      {
        containers.map(item => (
          <Container key={item.id} data={item.configuration.data} id={item.id} width={item.configuration.width} height={item.configuration.height} x={item.configuration.x} y={item.configuration.y} />
        ))
      }
      {
        rest.map(item => (
          <ArrangementItem key={item.id} props={item} />
        ))
      }
    </>
  );
};
