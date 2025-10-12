import { useState } from 'react';
import { useAnimation } from '../context';

export const useMouseSelection = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { selection, setSelection } = useAnimation();

  const handleMouseDownOnSelected = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelection({ topLeft: { x, y }, bottomRight: { x, y } });
    setIsDrawing(true);
  };

  const handleMouseMoveOnSelected = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (selection) {
      setSelection({ topLeft: selection.topLeft, bottomRight: { x, y } });
    }
  };

  const handleMouseUpOnSelected = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (selection) {
      setSelection({ topLeft: selection.topLeft, bottomRight: { x, y } });
    }
    setIsDrawing(false);
  };

  return {
    selection,
    handleMouseDownOnSelected,
    handleMouseMoveOnSelected,
    handleMouseUpOnSelected,
  };
};
