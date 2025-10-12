import { useState, useEffect } from "react"
import { useAnimation } from "../../../context"
import { ComponentInput } from "../../animation/ComponentInput"
import { ComponentAnimation } from "../../animation/ComponentAnimation"
import { FileSelection } from "../../common/FileSelection"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const TimeLineConfiguration = () => {
  const { setComponents, components } = useAnimation()
  const { getSelectedComponent }      = useAnimationHooks()

  const component = getSelectedComponent()

  const [data, setData] = useState([])
  const [t0, setT0] = useState(0)
  const [dt, setDt] = useState(100)

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
      component.configuration.data = data;
      const config = component.configuration as any;
      config.t0 = t0;
      config.dt = dt;
      setComponents([...components])
    }
  }, [data, component, setComponents, t0, dt])

  return (
    <div className="time-line-configuration">
      <div className="component-configuration-header">
        <span>TimeLine</span>
      </div>
      <div className="inputs">
        <FileSelection onDataChange={setData} directory="timeLine" />
        <ComponentInput label="Width" value={width ?? 0} onChange={setWidth} />
        <ComponentInput label="Height" value={height ?? 0} onChange={setHeight} />
        <ComponentInput label="t0" value={t0} onChange={setT0} />
        <ComponentInput label="dt" value={dt} onChange={setDt} />
        <ComponentInput label="x" value={x ?? 0} onChange={setX} />
        <ComponentInput label="y" value={y ?? 0} onChange={setY} />
      </div>
      <div className="animations">
        <ComponentAnimation label="runClock" type="timeLine" method="runClock" />
      </div>
    </div>
  )
}
