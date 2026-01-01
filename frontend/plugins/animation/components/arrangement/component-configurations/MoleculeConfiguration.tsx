import { useState } from "react"
import { FileDisplay } from "../../../../common/components/FileDisplay"
import { useAnimation } from "../../../context"
import { useAnimationHooks } from "../../../hooks/useAnimationHooks"
import { ComponentAnimation } from "../../animation/ComponentAnimation"
import { getJson } from "../../../../common/requests/get-json"

export const MoleculeConfiguration = () => {

  const { components, setComponents } = useAnimation()
  const { getSelectedComponent }      = useAnimationHooks()

  const component = getSelectedComponent()


  const setData = (file: string) => {
    if (component) {
      const fullPath = 'server/data/molecule/' + file
      getJson(fullPath).then((data: any) => {
        component.configuration.file = file
        component.configuration.data = data
        setComponents([...components])
      })
    }
  }

  return (
    <div className="molecule-configuration">
      <div className="inputs">
        <FileDisplay directoryKey="molecule" state={component?.configuration?.file} setState={setData} />
      </div>
      <div className="animations">
        <ComponentAnimation label="fadeIn" type="molecule" method="fadeIn" />
        <ComponentAnimation label="fadeOut" type="molecule" method="fadeOut" />
      </div>
    </div>
  )
}

