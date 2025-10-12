export const applyGridSnap = (x: number, y: number) => {
  const gridSize = 60;
  const snappedX = Math.round(x / gridSize) * gridSize;
  const snappedY = Math.round(y / gridSize) * gridSize;
  const snappedDeltaX = snappedX;
  const snappedDeltaY = snappedY;
  return { dx: snappedDeltaX, dy: snappedDeltaY };
}