import { useEffect } from 'react';
import { useAnimation } from '../context';
import { getDirectory } from '../../common/requests/get-directory';

export const useFetchOutputImages = () => {
  const { selectedDataFile, setOutputImages } = useAnimation();

  useEffect(() => {
    const fetchOutputImages = async () => {
      const outputImages_ = await getDirectory('output-images');
      setOutputImages(outputImages_);
    };
    fetchOutputImages();
  }, [selectedDataFile, setOutputImages]);
};
