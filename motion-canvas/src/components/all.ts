import { all as all_ } from "@motion-canvas/core";
import { AnimationClip } from "./AnimationClip";

export const all = (clips: AnimationClip[]) => {
  const duration = Math.max(...clips.map(clip => clip.duration));
  const animation = all_(...clips.map(clip => clip.animation));
  return { animation, duration };
};
