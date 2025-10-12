import { AnimationUI } from "../../types/AnimationUI";

export const setPositionsTemplate = (animations: AnimationUI[], i: number) => {
  const animation = animations[i]
  const duration  = animation.duration

  return `  yield* setPositions(components, animationData.animation[${i}].method.inputs[2].value, ${duration})`
}
