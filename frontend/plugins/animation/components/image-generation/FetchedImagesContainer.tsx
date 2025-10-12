import React from 'react';
import { useAnimation } from '../../context';

export const FetchedImagesContainer: React.FC = () => {
  const { fetchedImages, setSelectedImage } = useAnimation();
  return (
    <div className='fetched-images-container'>
      {fetchedImages && fetchedImages.map((image) => (
        <div
          key={image}
          onClick={() => setSelectedImage(image)}
          className='image-grid-cell'
        >
          <img src={image} alt="Fetched" />
        </div>
      ))}
    </div>
  );
};
