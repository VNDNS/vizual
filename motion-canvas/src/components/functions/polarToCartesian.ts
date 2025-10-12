import { Vector2 } from "@motion-canvas/core";


export const polarToCartesian = (radius: number, angle: number): Vector2 => {
  const radians = (angle * Math.PI) / 180;
  return new Vector2(radius * Math.cos(radians), radius * Math.sin(radians));
};
