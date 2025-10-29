import { useState, useEffect } from "react"
import { useAnimation } from "../../frontend/plugins/animation/context"
import { ComponentInput } from "../ComponentInput"
import { ComponentAnimation } from "../../frontend/plugins/animation/components/animation/ComponentAnimation"
import { FileSelection } from "@context/components/common/FileSelection"
import { useAnimationHooks } from "@context/hooks/useAnimationHooks"

export const PieChartConfiguration = () => {

  const { setComponents, components } = useAnimation()
  const { getSelectedComponent } = useAnimationHooks()

  const component = getSelectedComponent()

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

  const size = component?.configuration?.size
  const setSize = (value: number) => {
    if (component) {
      component.configuration.size = value
    }
    setComponents([...components])
  }

  useEffect(() => {
    if (component) {
      component.configuration.data = data
      setComponents([...components])
    }
  }, [data, component, setComponents])

  return (
  <div className="pie-chart-configuration">
    <div className="component-configuration-header">
      <span>Pie Chart</span>
    </div>
    <div className="inputs">
      <FileSelection onDataChange={setData} directory="barChart" />
      <ComponentInput label="Diameter" value={size ?? 0} onChange={setSize} />
      <ComponentInput label="x" value={x ?? 0} onChange={setX} />
      <ComponentInput label="y" value={y ?? 0} onChange={setY} />
    </div>
    <div className="animations">
      <ComponentAnimation label="activate"   type="pieChart" method="activate" />
      <ComponentAnimation label="deactivate" type="pieChart" method="deactivate" />
    </div>
  </div>
  )
}
