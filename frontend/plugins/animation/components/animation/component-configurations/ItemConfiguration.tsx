import { useState, useEffect } from "react"
import { useAnimation } from "../../../context"
import { ComponentInput } from "../../animation/ComponentInput"
import { ComponentAnimation } from "../../animation/ComponentAnimation"

export const ItemConfiguration = () => {

  const { components, setComponents, selectedComponent } = useAnimation()

  const component = components.find((component: any) => component.id === selectedComponent)

  const [logo, setLogo] = useState('')
  const [title, setTitle] = useState('')

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

  const width = (component?.configuration as any)?.width
  const setWidth = (value: number) => {
    if (component) {
      (component.configuration as any).width = value
    }
    setComponents([...components])
  }
  const height = (component?.configuration as any)?.height
  const setHeight = (value: number) => {
    if (component) {
      (component.configuration as any).height = value
    }
    setComponents([...components])
  }


  useEffect(() => {
    if (component) {
      (component.configuration as any).logo = logo;
      (component.configuration as any).title = title
      setComponents([...components])
    }
  }, [logo, title])

  return (
  <div className="line-plot-configuration">
    <div className="component-configuration-header">
      <span>Item</span>
    </div>
    <div className="inputs">
      <ComponentInput label="x" value={x ?? 0} onChange={setX} />
      <ComponentInput label="y" value={y ?? 0} onChange={setY} />
      <ComponentInput label="Width" value={width ?? 0} onChange={setWidth} />
      <ComponentInput label="Height" value={height ?? 0} onChange={setHeight} />
      <ComponentInput label="Title" value={title} onChange={setTitle} />
      <ComponentInput label="Logo" value={logo} onChange={setLogo} />
    </div>
    <div className="animations">
      <ComponentAnimation label="activate"   type="item" method="activate" />
      <ComponentAnimation label="deactivate" type="item" method="deactivate" />
      <ComponentAnimation label="setPosition" type="item" method="setPosition" />
    </div>
  </div>
  )
}
