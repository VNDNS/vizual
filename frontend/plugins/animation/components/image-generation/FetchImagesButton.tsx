import React from 'react';
import { useAnimation } from '../../context';
import { searchImages } from '../../requests/searchImages';

export const FetchImagesButton: React.FC = () => {
  const { setFetchedImages, searchTerm } = useAnimation();

  const handleFetchImages = async () => {
    const imageObjects = await searchImages(searchTerm);
    const images = imageObjects.map((image: any) => image.link);
    setFetchedImages(images);
  };

  return (
    <button onClick={handleFetchImages}>Fetch Images</button>
  );
};
