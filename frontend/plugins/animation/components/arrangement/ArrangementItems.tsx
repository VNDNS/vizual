import { useAnimation } from "../../context";
import { Container } from "./Container";
import { FlowChart } from "./FlowChart";

export const ArrangementItems = () => {

  const { components } = useAnimation();

  const flowCharts = components.filter((item: any) => item.type === 'flowChart') || []
  const containers = components.filter((item: any) => item.type === 'container') || []

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
    </>
  );
};
