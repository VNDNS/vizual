import { AnimationUI } from "../../types/AnimationUI";
import { getDeltaT } from "./getDeltaT";

export const getWaitForString = (animations: AnimationUI[], i: number) => {
  const animation         = animations[i];
  const previousAnimation = animations[i - 1];
  const deltaT            = getDeltaT(animation, previousAnimation, i);
  
  return deltaT > 0 ? `  clips.push({animation: null, duration: ${deltaT}})` : '';
};
