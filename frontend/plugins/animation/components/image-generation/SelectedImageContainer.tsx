import React from 'react';
import { useAnimation } from '../../context';
import { useMouseSelection } from '../../hooks/useMouseSelection';

export const SelectedImageContainer: React.FC = () => {
  const { selectedImage } = useAnimation();
  const {
    selection,
    handleMouseDownOnSelected,
    handleMouseMoveOnSelected,
    handleMouseUpOnSelected
  } = useMouseSelection();
  return (
    <div
      className='selected-image-container'
      onMouseDown={handleMouseDownOnSelected}
      onMouseMove={handleMouseMoveOnSelected}
      onMouseUp={handleMouseUpOnSelected}
      onDragStart={(e) => e.preventDefault()}
    >
      {selectedImage && <img src={selectedImage} alt="Selected" draggable={false} />}
      {selection && (
        <div
          className='selection-rect'
          style={{
            left: `${selection.topLeft.x}px`,
            top: `${selection.topLeft.y}px`,
            width: `${selection.bottomRight.x - selection.topLeft.x}px`,
            height: `${selection.bottomRight.y - selection.topLeft.y}px`,
          }}
        />
      )}
    </div>
  );
};
