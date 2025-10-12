import { Vector2 } from "@motion-canvas/core";
import { polarToCartesian } from "./polarToCartesian";


export const arcPoints = (radius: number, startAngle: number, endAngle: number, segments: number = 60, center: Vector2 = new Vector2(0, 0)
): Vector2[] => {
  const points: Vector2[] = [center];
  const angleStep = (endAngle - startAngle) / segments;
  for (let i = 0; i <= segments; i++) {
    const angle = startAngle + i * angleStep;
    const point = polarToCartesian(radius, angle).add(center);
    points.push(point);
  }
  return points;
};
