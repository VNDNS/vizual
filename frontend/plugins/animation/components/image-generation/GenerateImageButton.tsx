import React from 'react';
import { useAnimation } from '../../context';
import { useMouseSelection } from '../../hooks/useMouseSelection'; 
import { generateImage } from '../../requests/generateImage';

export const GenerateImageButton: React.FC = () => {
  const { selectedImage, setCroppedImage, searchTerm } = useAnimation();
  const { selection } = useMouseSelection();

  const handleCropImage = async () => {
    if (!selectedImage || !selection) return;
    const p1 = { x: selection.topLeft.x/6, y: selection.topLeft.y/6 };
    const p2 = { x: selection.bottomRight.x/6, y: selection.bottomRight.y/6 };
    const result = await generateImage(selectedImage, p1, p2, searchTerm);
    setCroppedImage(`data:image/png;base64,${result.generatedImage}`);
  };

  return (
    <button onClick={handleCropImage}>Generate Image</button>
  );
};
