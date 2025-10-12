
// Easing function for smooth interpolation
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const interpolateCamera = (data: any, t: number) => {
  // Filter camera animations and sort by start time
  const cameraAnimations = data
    .filter((item: any) => item.component === "camera")
    .sort((a: any, b: any) => a.start - b.start);

  // If no camera animations, return default values
  if (cameraAnimations.length === 0) {
    return { x: 0, y: 0, zoom: 1 };
  }

  // If t is before the first animation, return initial values
  if (t < cameraAnimations[0].start) {
    return { x: 0, y: 0, zoom: 1 };
  }

  // Find the current animation segment
  for (let i = 0; i < cameraAnimations.length; i++) {
    const current = cameraAnimations[i];
    const startTime = current.start;
    const endTime = startTime + current.duration;

    // If t is within this animation segment
    if (t >= startTime && t <= endTime) {
      // Calculate interpolation progress (clamp to 0-1 for safety)
      const linearProgress = Math.min(Math.max((t - startTime) / current.duration, 0), 1);

      // Apply easeInOutCubic easing to the progress
      const easedProgress = easeInOutCubic(linearProgress);

      // Get start values (previous animation end or default)
      let startX = 0, startY = 0, startZoom = 1;
      if (i > 0) {
        const prev = cameraAnimations[i - 1];
        startX = prev.inputs.x;
        startY = prev.inputs.y;
        startZoom = prev.inputs.zoom;
      }

      // Interpolate each property using eased progress
      const x = startX + (current.inputs.x - startX) * easedProgress;
      const y = startY + (current.inputs.y - startY) * easedProgress;
      const zoom = startZoom + (current.inputs.zoom - startZoom) * easedProgress;

      return { x, y, zoom };
    }

    // If this is the last animation and t is after it, return final values
    if (i === cameraAnimations.length - 1 && t > endTime) {
      return {
        x: current.inputs.x,
        y: current.inputs.y,
        zoom: current.inputs.zoom
      };
    }
  }

  // Fallback (shouldn't reach here normally)
  return { x: 0, y: 0, zoom: 1 };
};
