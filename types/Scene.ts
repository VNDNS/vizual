import { AnimationUI } from "./AnimationUI";
import { ComponentUI } from "./ComponentUI";

export type Scene = {
  components: ComponentUI[]
  animation:  AnimationUI[]
  tracks:     number
}
