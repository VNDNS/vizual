import React from 'react';
import { useAnimation } from '../../context';
import { getImage } from '../../../common/requests/get-image';

export const ImageItems: React.FC = () => {
  const {
    items,
    selectedItem,
    outputImages,
    setSelectedItem,
    setCroppedImage
  } = useAnimation();

  const selectItem = (item: any) => {
    setSelectedItem(item);
    if (outputImages.includes(item.name + '.png')) {
      getImage('output', item.name + '.png').then(image => {
        console.log('image', image);
        setCroppedImage(image);
      });
    }
  };
  return (
    <div className='image-items'>
      {items && items.map((item: any) => (
        <button
          className={`image-item ${selectedItem === item ? 'selected' : ''} ${outputImages.includes(item.name + '.png') ? 'generated' : ''}`}
          onClick={() => selectItem(item)}
          key={item.name}
        >
          {item.name} {outputImages.includes(item.name + '.png')}
        </button>
      ))}
    </div>
  );
};
