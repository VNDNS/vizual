import { useEffect } from 'react';
import { useAnimation } from '../context';
import { getJson } from '../../common/requests/get-json';

export const useFetchItems = () => {
  const { selectedDataFile, setItems } = useAnimation();

  useEffect(() => {
    const fetchItems = async () => {
      if (!selectedDataFile) return;
      const scene = await getJson(`motion-canvas/src/animations/${selectedDataFile}`);
      const nodes = scene.components.flatMap((component: any) => component.configuration.data.nodes);
      setItems(nodes);
    };
    fetchItems();
  }, [selectedDataFile, setItems]);
};
