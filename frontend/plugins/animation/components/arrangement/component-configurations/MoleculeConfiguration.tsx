import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { ComponentAnimation } from "../../animation/ComponentAnimation"
import { FileSelection } from "../../common/FileSelection"

export const MoleculeConfiguration = () => {

  const { components, setComponents } = useAnimation()
  const { getSelectedComponent }      = useAnimationHooks()

  const component = getSelectedComponent()

  const setData = (data: any) => {
    if (component) {
      component.configuration.data = data
      setComponents([...components])
    }
  }

  return (
    <div className="molecule-configuration">
      <div className="inputs">
        <FileSelection onDataChange={setData} directory="molecule" />
      </div>
      <div className="animations">
        <ComponentAnimation label="fadeIn" type="molecule" method="fadeIn" />
        <ComponentAnimation label="fadeOut" type="molecule" method="fadeOut" />
      </div>
    </div>
  )
}

