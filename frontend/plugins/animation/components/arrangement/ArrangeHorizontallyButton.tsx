import { arrangeHorizontally } from '@context/functions/arrangeHorizontally';
import { useAnimation } from '../../context';
import { useComputeEdges } from '@context/hooks/useComputeEdges';

export const ArrangeHorizontallyButton = () => {
  const { components, setComponents } = useAnimation();
  const { computeEdges } = useComputeEdges();

  const handleArrangeHorizontally = () => {
    const flowChart = components.find((c: any) => c.type === 'flowChart');
    const configData = (flowChart?.configuration as any)?.data;
    const newNodes = arrangeHorizontally(configData?.nodes);
    if (flowChart && configData) {
      configData.nodes = newNodes;
      setComponents(components);
      computeEdges(configData.nodes);
    }
  };

  return (
    <button onClick={handleArrangeHorizontally}>Arrange Horizontally</button>
  );
};
