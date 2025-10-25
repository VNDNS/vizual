
export const getSquarePoints = (size: () => number) => {
  return () => [
    { x: -(size()) / 2, y: -(size()) / 2 },
    { x: +(size()) / 2, y: -(size()) / 2 },
    { x: +(size()) / 2, y: +(size()) / 2 },
    { x: -(size()) / 2, y: +(size()) / 2 },
  ];
};
