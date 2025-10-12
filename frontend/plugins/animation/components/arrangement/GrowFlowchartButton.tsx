import { growFlowchart } from '../../../common/requests/grow-flowchart';
import { useAnimation } from '../../context';


export const GrowFlowchartButton = () => {

  const { currentData, languageModel, setCurrentData } = useAnimation();

  const nodes = currentData.nodes.map((node: any) => ({
    id: (node as any).id,
    name: (node as any).name,
    children: ((node as any).children || []).map((c: any) => typeof c === 'number' ? c : currentData.nodes.find((n: any) => (n as any).name === c)?.id ?? c),
  }));

  const data = {
    nodes,
    name: (currentData as any).name,
    description: (currentData as any).description
  };

  const handleGrowFlowchart = async () => {
    const result = await growFlowchart(data, languageModel);
    const { nodes } = result;

    const newNodes = nodes.map((node: any, index: number) => {
      const foundNodeIndex = currentData.nodes.findIndex((item: any) => (item as any).id === node.id);
      if (foundNodeIndex !== -1) {
        const oldNode = currentData.nodes[foundNodeIndex] as any;
        node.text = oldNode.text;
        node.suggestedChildren = oldNode.suggestedChildren;
        node.year = oldNode.year;
        node.id = oldNode.id;
        node.x = oldNode.x;
        node.y = oldNode.y;
      } else {
        node.id = currentData.nodes.length + index + 1;
        node.children = node.children || [];
        node.x = (currentData.nodes.at(-1) as any)?.x + 100;
        node.y = (currentData.nodes.at(-1) as any)?.y;
        node.year = 0;
        node.suggestedChildren = [];
      }
      return node;
    });

    setCurrentData({
      ...currentData,
      nodes: newNodes,
    });
  };

  return (
    <button onClick={handleGrowFlowchart}>Grow Flowchart</button>
  );
};
