import { useAnimation } from '../../context';
import { arrangeRadially } from '../../functions/arrangeRadially';


export const ArrangeRadiallyButton = () => {
  const { currentData, setCurrentData } = useAnimation();

  const handleArrangeRadially = () => {
    const newNodes = arrangeRadially(currentData.nodes);
    setCurrentData({
      ...currentData,
      nodes: newNodes,
    });
  };

  return (
    <button onClick={handleArrangeRadially}>Arrange Radially</button>
  );
};
