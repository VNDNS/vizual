import { useAnimation } from "@context/context";


export const useUpdateSelectedItems = () => {
  const { setSelectedItems, selectedItems, components } = useAnimation();

  const updateSelectedItems = () => {

    const selectedItems_ = selectedItems.map((item: any) => {
      if (item.itemType === 'node') {
        const flowChart = components.find((component: any) => component.id === item.componentId);
        if (flowChart) {
          const nodes = flowChart.configuration.data.nodes;
          const node = nodes.find((node: any) => node.id === item.id);
          return ({ ...item, x: node.x, y: node.y });
        }
      }
    });
    setSelectedItems(selectedItems_);
  };
  return updateSelectedItems;
};
