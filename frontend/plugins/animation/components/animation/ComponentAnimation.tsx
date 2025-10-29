import { id } from "../../../../../common/id"
import { useAnimation } from "../../context"
import { componentMap } from "../../maps/componentMap"

export const ComponentAnimation = ({ label, type, method }: { label: string, type: string, method: string }) => {

  const { components, selectedComponent, setAnimation, animation } = useAnimation()

  const component = components.find((component: any) => component.id === selectedComponent)

  const addAnimation = (type: string, name: string, method: string) => {
    if (animation.length === 0) {
      setAnimation([{ component: name, method, duration: 1, start: 0, inputs: componentMap[type][method], track: 0, id: id() }])
    } else {
      const previousAnimation = animation[animation.length - 1]
      const t0 = previousAnimation.start + previousAnimation.duration
      setAnimation([...animation, { component: name, method, duration: 1, start: t0, inputs: componentMap[type][method], track: 0, id: id() }])
    }
  }
  
  return (
    <button className="component-configuration-animation" onClick={() => addAnimation(type, component?.name || '', method)}>{label}</button>
  )
}