import { Side } from "./types";

export const axisOfSide = (side?: Side) =>
  side === 'left' || side === 'right' ? 'h' : 'v';

