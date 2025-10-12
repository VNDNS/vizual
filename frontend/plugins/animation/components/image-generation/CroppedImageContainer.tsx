import React from 'react';
import { useAnimation } from '../../context';

export const CroppedImageContainer: React.FC = () => {
  const { croppedImage } = useAnimation();
  return (
    <div className='cropped-image-container'>
      {croppedImage && <img src={croppedImage} alt="Cropped" />}
    </div>
  );
};
