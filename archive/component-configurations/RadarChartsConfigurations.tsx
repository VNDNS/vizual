import { useState, useEffect } from "react"
import { useAnimation } from "../../frontend/plugins/animation/context"
import { ComponentInput } from "../ComponentInput"
import { ComponentAnimation } from "../../frontend/plugins/animation/components/animation/ComponentAnimation"
import { FileSelection } from "../../frontend/plugins/animation/components/common/FileSelection"
import { useAnimationHooks } from "../../frontend/plugins/animation/hooks/useAnimationHooks"

export const RadarChartsConfiguration = () => {

  const { setComponents, components } = useAnimation()
  const { getSelectedComponent }      = useAnimationHooks()

  const component = getSelectedComponent()

  const [maxValue, setMaxValue] = useState(10)
  const [data, setData]         = useState([])


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
      (component.configuration as any).maxValue = maxValue
      component.configuration.data = data
      setComponents([...components])
    }
  }, [maxValue, data, x, y])

  return (
  <div className="bar-chart-configuration">
    <div className="component-configuration-header">
      <span>Radar Charts</span>
    </div>
    <div className="inputs">
      <FileSelection onDataChange={setData} directory="radarCharts" />
      <ComponentInput label="Max Value" value={maxValue ?? 0} onChange={setMaxValue} />
      <ComponentInput label="X"         value={x ?? 0}        onChange={setX} />
      <ComponentInput label="Y"         value={y ?? 0}        onChange={setY} />
      <ComponentInput label="Width"     value={width ?? 0}    onChange={setWidth} />
      <ComponentInput label="Height"    value={height ?? 0}   onChange={setHeight} />
    </div>
    <div className="animations">
      <ComponentAnimation label="activate"   type="radarCharts" method="activate" />
      <ComponentAnimation label="deactivate" type="radarCharts" method="deactivate" />
    </div>
  </div>
  )
}