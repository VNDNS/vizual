import { AnimationClip } from "../types/AnimationClip";
import { linear } from "./linear";


export const linear_ = (startTime: number, duration: number, callback: (value: number) => void): AnimationClip => {
  return {
    animation: linear(startTime, duration, callback),
    duration: startTime + duration
  };
};
