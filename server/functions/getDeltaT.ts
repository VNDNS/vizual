export const getDeltaT = (animation: any, previousAnimation: any, i: number) => {
  if (i === 0) { return 0 }

  const t0 = previousAnimation.start;
  const dt = previousAnimation.duration;
  
  return parseFloat((animation.start - t0 - dt).toFixed(2));
};
