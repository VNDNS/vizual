import { useState, useEffect } from "react"
import { useAnimation } from "../../../context"
import { ComponentInput } from "../../animation/ComponentInput"
import { ComponentAnimation } from "../../animation/ComponentAnimation"

export const LargeNumberConfiguration = () => {

  const { components, setComponents, selectedComponent } = useAnimation()

  const component = components.find((component: any) => component.id === selectedComponent)

  const [value, setValue] = useState(100)

  const x = component?.configuration?.x
  const setX = (value: number) => {
    if (component) {
      component.configuration.x = value
    }
    setComponents([...components])
  }

  const y = component?.configuration?.y
  const setY = (value: number) => {
    if (component) {
      component.configuration.y = value
    }
    setComponents([...components])
  }

  const size = component?.configuration?.size
  const setSize = (value: number) => {
    if (component) {
      component.configuration.size = value
    }
    setComponents([...components])
  }


  useEffect(() => {
    if (component) {
      (component.configuration as any).value = value;
      (component.configuration as any).size = size
      setComponents([...components])
    }
  }, [value, size])

  return (
  <div className="large-number-configuration">
    <div className="component-configuration-header">
      <span>Large Number</span>
    </div>
    <div className="inputs">
      <ComponentInput label="Value" value={value} onChange={setValue} />
      <ComponentInput label="Size" value={size ?? 0} onChange={setSize} />
      <ComponentInput label="x" value={x ?? 0} onChange={setX} />
      <ComponentInput label="y" value={y ?? 0} onChange={setY} />
    </div>
    <div className="animations">
      <ComponentAnimation label="activate"   type="largeNumber" method="activate" />
      <ComponentAnimation label="run"        type="largeNumber" method="run" />
    </div>
  </div>
  )
}

