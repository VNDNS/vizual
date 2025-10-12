import { setPositionsTemplate } from "./setPositionsTemplate";
import { defaultTemplate } from "./defaultTemplate";
import { AnimationUI } from "../../types/AnimationUI";

export const getAnimationString = (animations: AnimationUI[], i: number) => {
  
  const animation = animations[i];
  const name      = animation.method;

  if (name === 'setPositions') {
    return setPositionsTemplate(animations, i);
  }

  return defaultTemplate(animations, i);
};
