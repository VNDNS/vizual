import { useEffect } from 'react';
import { useAnimation } from '../context';
import { getImage } from '../../common/requests/get-image';

export const useSetImages = () => {
  const { selectedInputImage, setImageBase64, setOutputImageBase64 } = useAnimation();

  useEffect(() => {
    if (selectedInputImage) {
      getImage('padded', selectedInputImage).then(image => {
        setImageBase64(image);
      });
      getImage('output', selectedInputImage).then(image => {
        setOutputImageBase64(image);
      });
    }
  }, [selectedInputImage, setImageBase64, setOutputImageBase64]);
};
