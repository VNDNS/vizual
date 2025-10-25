
export const getShadowProps = (activation: () => number) => {
  return { shadowBlur: () => 50 * activation(), shadowColor: '#00000080', clip: true, shadowOffsetX: () => 20 * activation(), shadowOffsetY: () => 20 * activation() };
};
