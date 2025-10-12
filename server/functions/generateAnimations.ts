import { generateSingleTrackAnimations } from "./generateSingleTrackAnimations";

export function generateAnimations(scene: any): string {
  return generateSingleTrackAnimations(scene.animation).join('\n')
}
