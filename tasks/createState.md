Please add a state variable to the context.

name of the state variable: draggingDelta

define the state variable in frontend/plugins/animation/state/animationState.ts
define the type in types/AnimationContextType.ts
include it in the usePersistence hook infrontend/plugins/animation/state/usePersistence.ts

state variable type: { x: number, y: number }

initial value: { x: 0, y: 0 }