import { Txt } from "@motion-canvas/2d";


export const getInfoLinePoints = (size: () => number, infoText: Txt) => {

  const lineOffsetY = 20;
  const position    = infoText.position();
  const lineY       = position.y + lineOffsetY;
  const dx          = position.x;
  const dy          = lineY;
  const angle       = Math.atan2(dy, dx);

  const circleRadius = () => size() / 2;
  const startX = () => circleRadius() * Math.cos(angle);
  const startY = () => circleRadius() * Math.sin(angle);

  const textWidth = infoText.width();
  const points = () => [
    { x: startX(), y: startY() },
    { x: position.x, y: lineY },
    { x: position.x + textWidth, y: lineY }
  ];
  return points;
};
