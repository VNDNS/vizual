import { delay, tween } from "@motion-canvas/core";


export const linear = (t0: number, dt: number, f: (value: number) => void) => {
  return delay(t0, tween(dt, value => { f(value); }));
};
