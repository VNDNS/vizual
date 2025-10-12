import { createContext, useContext } from "react"
import { AnimationContextType } from "../../../types/AnimationContextType"
import { useAnimationState } from "./state/animationState"
import { usePersistence } from "./state/usePersistence"

const AnimationContext = createContext<AnimationContextType | null>(null)

const Provider = AnimationContext.Provider

export const AnimationStateProvider = ({ children }: { children: React.ReactNode }) => {
  const state = useAnimationState()
  const { saveState, loadState, resetState } = usePersistence(state)

  const value = {
    ...state,
    saveState,
    loadState,
    resetState,
  }

  return (
    <Provider value={value}>
      {children}
    </Provider>
  )
}

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within a AnimationStateProvider');
  }
  return context;
}
