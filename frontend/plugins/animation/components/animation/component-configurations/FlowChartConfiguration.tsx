import { ComponentAnimation } from "../../animation/ComponentAnimation"
import { FileSelection } from "../../common/FileSelection"
import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { ComponentInput } from "../../animation/ComponentInput"

export const FlowChartConfiguration = () => {

  const { setComponents, components } = useAnimation()
  const { getSelectedComponent }      = useAnimationHooks()

  const component = getSelectedComponent()

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

  const setData = (data: any) => {
    if (component) {
      component.configuration.data = data
      setComponents([...components])
    }
  }

  return (
  <div className="flow-chart-configuration">
    <div className="component-configuration-header">
      <span>Flow Chart</span>
    </div>
    <div className="inputs">
      <FileSelection onDataChange={setData} directory="flowChart" />
      <ComponentInput label="x" value={x ?? 0} onChange={setX} />
      <ComponentInput label="y" value={y ?? 0} onChange={setY} />
    </div>
    <div className="animations">
      <ComponentAnimation label="activate"   type="flowChart" method="activate" />
      <ComponentAnimation label="deactivate" type="flowChart" method="deactivate" />
    </div>
  </div>
  )
}

