import { delay } from "@motion-canvas/core";
import { AnimationClip } from "../types/AnimationClip";


export const delay_ = (startTime: number, clip: AnimationClip): AnimationClip => {
  return {
    animation: delay(startTime, clip.animation),
    duration: startTime + clip.duration
  };
};
