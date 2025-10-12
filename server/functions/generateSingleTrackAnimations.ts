import { AnimationUI } from "../../types/AnimationUI";
import { getAnimationString } from "./getAnimationString";
import { getWaitForString } from "./getWaitForString";

export function generateSingleTrackAnimations(animations: AnimationUI[]) {
  
  const array: string[] = [];
  
  for (let i = 0; i < animations.length; i++) {
    
    const waitForString   = getWaitForString(animations, i);
    const animationString = getAnimationString(animations, i);

    array.push(waitForString);
    array.push(animationString);
  }

  return array
}