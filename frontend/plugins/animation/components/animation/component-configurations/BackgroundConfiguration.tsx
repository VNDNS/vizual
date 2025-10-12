import { ComponentAnimation } from "../ComponentAnimation"
import { FileSelection } from "../../common/FileSelection"
import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"

export const BackgroundConfiguration = () => {

  const { setComponents, components } = useAnimation()
  const { getSelectedComponent }      = useAnimationHooks()

  const component = getSelectedComponent()


  const setData = (data: any) => {
    console.log('setData', data)
    if (component) {
      component.configuration.data = data
      setComponents([...components])
    }
  }

  return (
  <div className="background-configuration">
    <div className="component-configuration-header">
      <span>Background</span>
    </div>
    <div className="inputs">
      <FileSelection onDataChange={setData} directory="background" />
    </div>
    <div className="animations">
      <ComponentAnimation label="activate"   type="background" method="activate" />
      <ComponentAnimation label="deactivate" type="background" method="deactivate" />
    </div>
  </div>
  )
}

