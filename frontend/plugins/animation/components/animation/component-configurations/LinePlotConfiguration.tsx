import { useState, useEffect } from "react"
import { useAnimation } from "../../../context"
import { ComponentInput } from "../../animation/ComponentInput"
import { ComponentAnimation } from "../../animation/ComponentAnimation"
import { FileSelection } from "../../common/FileSelection"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const LinePlotConfiguration = () => {

  const { setComponents, components } = useAnimation()
  const { getSelectedComponent }      = useAnimationHooks()

  const component = getSelectedComponent()

  const [data, setData]     = useState([])

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
      component.configuration.data = data
      setComponents([...components])
    }
  }, [data])

  return (
  <div className="line-plot-configuration">
    <div className="component-configuration-header">
      <span>Line Plot</span>
    </div>
    <div className="inputs">
      <FileSelection onDataChange={setData} directory="linePlot" />
      <ComponentInput label="Width" value={width ?? 0} onChange={setWidth} />
      <ComponentInput label="Height" value={height ?? 0} onChange={setHeight} />
      <ComponentInput label="x" value={x ?? 0} onChange={setX} />
      <ComponentInput label="y" value={y ?? 0} onChange={setY} />
    </div>
    <div className="animations">
      <ComponentAnimation label="activate"   type="linePlot" method="activate" />
      <ComponentAnimation label="deactivate" type="linePlot" method="deactivate" />
    </div>
  </div>
  )
}
