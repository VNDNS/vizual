import { sequence } from "@motion-canvas/core";
import { AnimationClip } from "./AnimationClip.1";


export const sequence_ = (spacing: number, clips: AnimationClip[]): AnimationClip => {

  const endings = clips.map((clip: any, index: number) => clip.duration + spacing * index);
  const totalDuration = Math.max(...endings);

  return {
    animation: sequence(spacing, ...clips.map(clip => clip.animation)),
    duration: totalDuration
  };
};
