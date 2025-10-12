export type AnimationUI = {
  component:   string
  method:      string
  duration:    number
  start:       number
  inputs:      Record<string, unknown>
  track:       number
  id:          string
  name?:       string
}
