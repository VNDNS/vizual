import { useState, useEffect } from "react"
import { useAnimation } from "../../../context"
import { ComponentInput } from "../../animation/ComponentInput"
import { ComponentAnimation } from "../../animation/ComponentAnimation"
import { FileSelection } from "../../common/FileSelection"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { GenericDataConfiguration } from "../../../../../../types/ComponentConfiguration"

export const BarChartConfiguration = () => {

  const { setComponents, components } = useAnimation()
  const { getSelectedComponent }      = useAnimationHooks()

  const component = getSelectedComponent()
  const config = component?.configuration as GenericDataConfiguration

  const [barWidth, setBarWidth] = useState(80)
  const [gap, setGap]           = useState(20)
  const [data, setData]         = useState([])

  const x = config?.x
  const setX = (value: number) => {
    if (config) {
      config.x = value
    }
    setComponents([...components])
  }

  const y = config?.y
  const setY = (value: number) => {
    if (config) {
      config.y = value
    }
    setComponents([...components])
  }

  const width = config?.width
  const setWidth = (value: number) => {
    if (config) {
      config.width = value
    }
    setComponents([...components])
  }
  const height = config?.height
  const setHeight = (value: number) => {
    if (config) {
      config.height = value
    }
    setComponents([...components])
  }

  useEffect(() => {
    if (config) {
      (config.data as any).barWidth = barWidth;
      (config.data as any).gap = gap;
      config.data = data
      setComponents([...components])
    }
  }, [barWidth, gap, data])

  return (
  <div className="bar-chart-configuration">
    <div className="component-configuration-header">
      <span>Bar Chart</span>
    </div>
    <div className="inputs">
      <FileSelection onDataChange={setData} directory="barChart" />
      <ComponentInput label="Width"     value={width ?? 0}    onChange={setWidth} />
      <ComponentInput label="Height"    value={height ?? 0}   onChange={setHeight} />
      <ComponentInput label="x"         value={x ?? 0}        onChange={setX} />
      <ComponentInput label="y"         value={y ?? 0}        onChange={setY} />
      <ComponentInput label="Bar Width" value={barWidth} onChange={setBarWidth} />
      <ComponentInput label="Gap"       value={gap}      onChange={setGap} />
    </div>
    <div className="animations">
      <ComponentAnimation label="activate"   type="barChart" method="activate" />
      <ComponentAnimation label="deactivate" type="barChart" method="deactivate" />
    </div>
  </div>
  )
}
