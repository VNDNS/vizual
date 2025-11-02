import { tween } from "@motion-canvas/core";
import { AnimationClip } from "./types/AnimationClip";


export const tween_ = (duration: number, callback: (value: number) => void): AnimationClip => {
  return {
    animation: tween(duration, callback),
    duration
  };
};
