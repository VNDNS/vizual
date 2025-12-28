import { useAnimation } from "@context/context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { id } from "../../../../../../common/id"

export const ComponentConfiguration = () => {
  
  const { getSelectedComponent } = useAnimationHooks()
  const { animation, setAnimation } = useAnimation()
  

  const selectedComponent = getSelectedComponent()

  const fadeInComponent = () => {
    const lastAnimation = animation.at(-1)
    const start = (lastAnimation?.start ?? 0) + (lastAnimation?.duration ?? 0)
    const newAnimation = { component: selectedComponent?.name || '', method: 'fadeIn', duration: 1, start: start, inputs: {}, track: 0, id: id() }
    setAnimation([...animation, newAnimation])
  }

  if(selectedComponent?.type === 'flowChart') {
    return null
  }

  return (
    <>
      <div>
        <span>{selectedComponent?.name}</span>
      </div>
      <button onClick={() => fadeInComponent()}>Fade In Component</button>
    </>
  )
}